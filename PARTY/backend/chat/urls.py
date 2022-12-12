from . import views
from django.urls import path

app_name = "chat"

urlpatterns = [
    path("getmessage/", views.GetMessageView.as_view(), name='get_message'),
    path("getconversation/", views.GetConversationView.as_view(), name='get_conversation'),
]
