from rest_framework import serializers

from .models import Message, Conversation


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    recipient = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ("sender", "recipient", "created", "message", "uuid")


class ConversationSerializer(serializers.ModelSerializer):
    message = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ("message", )