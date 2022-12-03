import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatRoomConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        print(self.user)
        # async_to_sync(self.channel_layer.group_add)('testowy', self.user.email)
        self.accept()

        # self.to_user = self.scope["url_route"]["kwargs"]["to_user"]
        # self.room_group_name = self.to_user
        # async_to_sync(self.channel_layer.group_add)(
        #     self.
        # )

    def disconnect(self, code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        async_to_sync(self.channel_layer.group_send)('testowy', {"type": "chat_message", "message": message})

    def chat_message(self, event):
        message = event["message"]
        print(message)
        self.send(text_data=json.dumps({"message": message}))
