from django.urls import path
from . import consumers


websocket_urlpatterns = [
    path('ws/chat/<int:to_user>/', consumers.ChatRoomConsumer.as_asgi()),
]
