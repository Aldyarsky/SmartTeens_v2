from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category, MarathonLesson, Marathon, MarathonReview, MarathonParticipant


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MarathonReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarathonReview
        fields = '__all__'

class MarathonSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Marathon
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.marathonreview_set.all()
        serializer = MarathonReviewSerializer(reviews, many=True)
        return serializer.data

class MarathonCategorySerializer(serializers.ModelSerializer):
    marathons = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Category
        fields = '__all__'
    def get_marathons(self, obj):
        marathons = obj.marathon_set.all()[0:5]
        serializer = MarathonSerializer(marathons, many=True)
        return serializer.data
        
class MarathonLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarathonLesson
        fields = '__all__'


class MarathonParticipantSerializer(serializers.ModelSerializer):
    marathons = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = MarathonParticipant
        fields = '__all__'
    def get_marathons(self, obj):
        marathons = Marathon.objects.filter(pk=obj.marathon._id)
        serializer = MarathonSerializer(marathons, many=True)
        return serializer.data