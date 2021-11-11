from django.urls import path
from account import views
from django.contrib.auth import views as auth_views

app_name = "account"

urlpatterns = [
    path("login/", views.LoginUserView.as_view(), name="login"),
    path("register/", views.RegisterView.as_view(), name="register"),
]
