from django.db import models
from django.contrib.auth import get_user_model


class Message(models.Model):
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="sent_message")
    recipient = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="received_message")
    created = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
