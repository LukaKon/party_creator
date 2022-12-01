from django.urls import re_path, path
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/chat/', consumers.ChatRoomConsumer.as_asgi()),
]
