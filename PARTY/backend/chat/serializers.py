from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    recipient = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ("sender", "recipient", "created", "message")
