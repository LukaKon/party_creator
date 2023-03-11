from django.urls import path
from . import consumers


websocket_urlpatterns = [
    path('ws/chat/<int:recipient>/<int:announcement>/', consumers.ChatRoomConsumer.as_asgi()),
]
