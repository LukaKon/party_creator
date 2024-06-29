"""
URL mapping for the user API.
"""
from account import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)


app_name = "account"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutAllView.as_view(), name="logout"),
    # path("login/get_token/", TokenObtainPairView.as_view(), name="get_token"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("getuser/", views.RetrieveUserView.as_view(), name="get_user"),
    path("getprofile/", views.RetrieveProfileView.as_view(), name="get_profile"),
    path("updateprofile/", views.UpdateUserView.as_view(), name="update_user"),
    path("changepassword/", views.ChangePasswordView.as_view(), name="change_password"),
    path("handleemail/", views.HandleEmailView.as_view(), name="handle_email"),
]
