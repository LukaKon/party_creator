from django.contrib.auth import views as auth_views
from django.urls import path

from account import views

app_name = "account"


urlpatterns = [
    path("login/", views.LoginUserView.as_view(), name="login"),
    path("logout/", views.LogoutUserView.as_view(), name="logout"),
    path("register/", views.RegisterView.as_view(), name="register"),
]
