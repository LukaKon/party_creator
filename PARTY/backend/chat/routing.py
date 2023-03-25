from django.urls import path
from . import consumers


websocket_urlpatterns = [
    path('ws/chat/<int:seller>/<int:customer>/<int:announcement>/', consumers.ChatRoomConsumer.as_asgi()),
]
