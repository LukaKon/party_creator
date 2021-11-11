from django.urls import path
from announcement import views
from django.contrib.auth import views as auth_views

app_name = "announcement"

urlpatterns = [
    path('',views.HomeView.as_view(),name='home'),
]