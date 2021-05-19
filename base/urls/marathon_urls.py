from django.urls import path
from base.views import marathon_views as views

urlpatterns = [

    path('', views.getMarathons, name="marathons"),

    path('create/', views.createMarathon, name="marathon-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createMarathonReview, name="create-review"),
    path('top/', views.getTopMarathons, name='top-marathons'),
    path('<str:pk>/', views.getMarathon, name="marathon"),

    path('update/<str:pk>/', views.updateMarathon, name="marathon-update"),
    path('delete/<str:pk>/', views.deleteMarathon, name="marathon-delete"),
]
