"""
URL mapping for the user API.
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from account import views

app_name = "account"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutAllView.as_view(), name="logout"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("testapi/", views.testAPI.as_view(), name="testAPI"),
    path("getprofile/", views.GetUserAPI.as_view(), name="GetUser"),
]
