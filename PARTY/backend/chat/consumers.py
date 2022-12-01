from channels.generic.websocket import WebsocketConsumer
import json


class ChatRoomConsumer(WebsocketConsumer):
    def connect(self):
        # self.to_user = self.scope["url_route"]["kwargs"]["to_user"]
        # self.room_group_name = self.to_user
        # async_to_sync(self.channel_layer.group_add)(
        #     self.
        # )

        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)

        self.send(text_data=json.dumps({"message": 'odpowiedz'}))
