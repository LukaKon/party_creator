import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone

import chat.models
from .models import Message, Conversation, VoiceMessage


class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.user_id = self.user.id
        self.recipient_id = self.scope['url_route']['kwargs']['recipient']
        self.announcement_id = self.scope['url_route']['kwargs']['announcement']
        await self.set_exists_conversation()
        if self.user_id > self.recipient_id:
            self.room_name = str(self.user_id) + '_' + str(self.recipient_id) + '_' + str(self.announcement_id)
        else:
            self.room_name = str(self.recipient_id) + '_' + str(self.user_id) + '_' + str(self.announcement_id)
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        try:
            message = text_data_json['voice']
            self.type_message = "voice_message"
        except KeyError:
            message = text_data_json['message']
            self.type_message = 'text_message'

        now = timezone.now()

        if self.exists_conversation is False:
            # More one check conversation, because self.exists_conversation can be False after first message
            await self.set_exists_conversation()

        db_message = await self.create_message_in_database(message)
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "chat_message",
                "type_message": self.type_message,
                "message": message,
                "user": self.user.email,
                "datetime": now.isoformat(),
                "uuid": str(db_message.uuid),
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def set_exists_conversation(self):
        if Conversation.objects.filter(announcement_id=self.announcement_id, sender=self.user_id).exists():
            self.exists_conversation = Conversation.objects.get(
                announcement_id=self.announcement_id,
                sender=self.user_id)
        else:
            self.exists_conversation = False

    @database_sync_to_async
    def create_message_in_database(self, message):
        try:
            voice_message_instance = VoiceMessage.objects.get(voice_message=message[message.find('chat'):])
        except chat.models.VoiceMessage.DoesNotExist:
            voice_message_instance = None

        if self.exists_conversation:
            message = Message.objects.create(
                sender_id=self.user_id,
                recipient_id=self.recipient_id,
                message=message,
                conversation=self.exists_conversation,
                voice_message=voice_message_instance
            )
        else:
            conversation = Conversation.objects.create(
                announcement_id=self.announcement_id,
                sender_id=self.user_id
            )

            message = Message.objects.create(
                sender_id=self.user_id,
                recipient_id=self.recipient_id,
                message=message,
                conversation=conversation,
            )
        return message
