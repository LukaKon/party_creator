from rest_framework import serializers

from .models import Message, Conversation, VoiceMessage
from announcement.serializers import AnnouncementForConversationSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    recipient = serializers.StringRelatedField()
    voice_message = "VoiceMessageSerializer"

    class Meta:
        model = Message
        fields = ("sender", "recipient", "created", "message", "voice_message",  "uuid")


class ConversationSerializer(serializers.ModelSerializer):
    message = MessageSerializer(many=True, read_only=True)
    announcement = AnnouncementForConversationSerializer(read_only=True)

    class Meta:
        model = Conversation
        fields = ("message", "customer", "seller", "announcement", "id")


class VoiceMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = VoiceMessage
        fields = ("voice_message", )
