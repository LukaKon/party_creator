"""
URL mapping for the user API.
"""
from account import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


app_name = "account"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutAllView.as_view(), name="logout"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("testapi/", views.testAPI.as_view(), name="testAPI"),
    path("getprofile/", views.GetUserAPI.as_view(), name="get_user"),
    path("updateprofile/", views.UpdateUserAPI.as_view(), name="update_user"),
]
