from django.urls import path
from account import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = "account"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutAllView.as_view(), name="logout"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('testapi/', views.testAPI.as_view(), name='testAPI'),
]
