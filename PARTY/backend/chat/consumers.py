import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone

from .models import Message

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.recipient_id = self.scope['url_route']['kwargs']['to_user']
        self.user_id = self.user.id
        if self.user_id > self.recipient_id:
            self.room_name = str(self.user_id) + '_' + str(self.recipient_id)
        else:
            self.room_name = str(self.recipient_id) + '_' + str(self.user_id)
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        now = timezone.now()
        await self.create_message_in_database(message)
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "chat_message",
                "message": message,
                "user": self.user.email,
                "datetime": now.isoformat(),
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def create_message_in_database(self, message):
        Message.objects.create(
            sender_id=self.user_id,
            recipient_id=self.recipient_id,
            message=message,
        )
