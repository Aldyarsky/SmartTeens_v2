from django.urls import path
from base.views import marathon_views as views

urlpatterns = [

    path('', views.getMarathons, name="marathons"),

    path('create/', views.createMarathon, name="marathon-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('marathon/<str:pk>/reviews/', views.createMarathonReview, name="create-review"),
    path('top/', views.getTopMarathons, name='top-marathons'),
    path('marathon/<str:pk>/', views.getMarathon, name="marathon"),

    path('update/<str:pk>/', views.updateMarathon, name="marathon-update"),
    path('delete/<str:pk>/', views.deleteMarathon, name="marathon-delete"),

    path('category/marathons', views.getTopMarathonsByCategory, name='category-marathons'),
    path('buy/marathon', views.createMarathonParticipant, name='buy-marathon'),
    path('marathons/mymarathons', views.getMyMarathons, name='my-marathons'),
    path('lessons/<int:pk>', views.getLessons, name='lessons')
]
