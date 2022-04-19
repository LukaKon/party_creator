from django.urls import path
from account import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = "account"

urlpatterns = [
    path("login/", views.MyObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
]
