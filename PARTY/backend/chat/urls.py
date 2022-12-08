from . import views
from django.urls import path

app_name = "chat"

urlpatterns = [
    path("getmessage/", views.GetMessageView.as_view(), name='get_message'),
]
