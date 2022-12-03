from django.urls import re_path, path
from . import consumers


websocket_urlpatterns = [
    path('ws/chat/', consumers.ChatRoomConsumer.as_asgi()),
    # re_path(r'ws(?P<token>\w+)/chat/', consumers.ChatRoomConsumer.as_asgi()),
    # re_path(r'ws/auth/', consumers.ChatRoomConsumer.as_asgi()),
    #URLE
    # re_path(r"^notifications/(?P<stream>\w+)/$", LongPollConsumer.as_asgi()),
    # path(r"ws/chat/<str:token>/", consumers.ChatRoomConsumer.as_asgi()),
    # re_path(r'^ws(?P<token>\w+)/chat/$', consumers.ChatRoomConsumer.as_asgi())
]
