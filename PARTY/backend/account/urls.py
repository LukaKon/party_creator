from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from account import views

app_name = "account"

urlpatterns = [
    path("login/", views.MyObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('testapi/', views.testAPI.as_view(), name='testAPI'),
]
