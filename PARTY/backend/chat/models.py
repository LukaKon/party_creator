from django.db import models
from django.contrib.auth import get_user_model

import uuid as uuid_lib

from announcement.models import Announcement


class Conversation(models.Model):
    announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE, related_name="conversation")
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="sender")


class Message(models.Model):
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="sent_message")
    recipient = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="received_message")
    created = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="message")
    uuid = models.UUIDField(default=uuid_lib.uuid4)
