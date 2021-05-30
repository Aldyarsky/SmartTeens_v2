from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Marathon, MarathonReview, Category,MarathonLesson, MarathonParticipant
from base.serializers import MarathonSerializer, MarathonCategorySerializer,MarathonParticipantSerializer, MarathonLessonSerializer

from rest_framework import status


@api_view(['GET'])
def getMarathons(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    marathons = Marathon.objects.filter(
        title__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(marathons, 5)

    try:
        marathons = paginator.page(page)
    except PageNotAnInteger:
        marathons = paginator.page(1)
    except EmptyPage:
        marathons = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = MarathonSerializer(marathons, many=True)
    return Response({'marathons': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopMarathons(request):
    marathons = Marathon.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = MarathonSerializer(marathons, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopMarathonsByCategory(request):
    categories = Category.objects.order_by('count')[0:5]
    serializer = MarathonCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMarathon(request, pk):
    marathon = Marathon.objects.get(_id=pk)
    serializer = MarathonSerializer(marathon, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createMarathon(request):
    user = request.user

    marathon = Marathon.objects.create(
        owner=user,
        title='Sample Name',
        price=0,
        category=None,
        description=''
    )
    serializer = MarathonSerializer(marathon, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMarathonParticipant(request):
    print(request.data)
    marathon_participant = MarathonParticipant.objects.create(
            user= User.objects.get(pk=request.data["user"]),
            marathon = Marathon.objects.get(pk=request.data["marathon"])
        )
    marathon_participant.save()
    serializer = MarathonParticipantSerializer(marathon_participant, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyMarathons(request):
    user = request.user
    marathon_participant = MarathonParticipant.objects.filter(user=user) 
    serializer = MarathonParticipantSerializer(marathon_participant, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getLessons(request, pk):
    marathon = Marathon.objects.get(_id=pk)
    user = User.objects.get(id=request.user.id)
    num_results = MarathonParticipant.objects.filter(marathon=marathon, user=user).count()
    print(num_results)
    if(num_results > 0):
        marathon_lessons = MarathonLesson.objects.filter(marathon=marathon).all()
        serializer = MarathonLessonSerializer(marathon_lessons, many=True)
        return Response(serializer.data)
    return Response('404 - Not Found')
    

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateMarathon(request, pk):
    data = request.data
    marathon = Marathon.objects.get(_id=pk)

    marathon.title = data['title']
    marathon.price = data['price']
    category = Category()
    if(Category.objects.filter(label=data['category'])):
        category = Category.objects.filter(label=data['category'])[0]
    else:
        category = Category(label=data['category'],count=1)
        category.save()
    marathon.category = category
    marathon.description = data['description']

    marathon.save()

    serializer = MarathonSerializer( marathon, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteMarathon(request, pk):
    marathon = Marathon.objects.get(_id=pk)
    marathon.delete()
    return Response('Marathon Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    marathon_id = data['marathon_id']
    marathon = Marathon.objects.get(_id=marathon_id)

    marathon.image = request.FILES.get('image')
    marathon.save()

    return Response('Image was uploaded')

@api_view(['POST'])
def uploadVideo(request):
    data = request.data

    marathon_id = data['marathon_id']
    marathon_lesson = MarathonLesson.objects.get(marathon=marathon_id)

    marathon_lesson.video = request.FILES.get('video')
    marathon_lesson.save()

    return Response('Video was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMarathonReview(request, pk):
    user = request.user
    marathon = Marathon.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = marathon.marathonreview_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Marathon already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = MarathonReview.objects.create(
            user=user,
            marathon=marathon,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = marathon.marathonreview_set.all()
        marathon.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        marathon.rating = total / len(reviews)
        marathon.save()

        return Response('Review Added')
