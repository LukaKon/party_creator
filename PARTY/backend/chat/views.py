from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from .models import Message, Conversation, VoiceMessage
from .serializers import MessageSerializer, \
    ConversationSerializer, \
    VoiceMessageSerializer


class GetMessageView(APIView):
    model = Message
    permission_classes = (IsAuthenticated, )
    serializer_class = MessageSerializer

    def get_queryset(self):
        recipient_id = self.request.data.get('recipient')
        queryset = self.model.objects.filter(
            Q(sender_id=self.request.user.id, recipient_id=recipient_id) |
            Q(sender_id=recipient_id, recipient_id=self.request.user.id)
        ).order_by("created")
        return queryset

    def post(self, request):
        data = self.get_queryset()
        serialized_data = self.serializer_class(data, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)


class CreateVoiceMessageView(CreateAPIView):
    model = VoiceMessage
    permission_classes = (IsAuthenticated, )
    serializer_class = VoiceMessageSerializer

    # def perform_create(self, serializer):
    #     super().perform_create(serializer)
    #     return serializer.id
    # def post(self, request, *args, **kwargs):
    #     return super().post(self, request, *args, **kwargs)


class GetConversationView(APIView):
    model = Conversation
    permission_classes = (IsAuthenticated, )
    serializer_class = ConversationSerializer

    def get_queryset(self):
        announcement_id = self.request.data.get('announcement')
        sender_id = self.request.data.get('sender')
        try:
            queryset = self.model.objects.get(announcement_id=announcement_id, sender_id=sender_id)
        except:
            Response(status=status.HTTP_400_BAD_REQUEST)
        return queryset

    def post(self, request):
        data = self.get_queryset()
        serialized_data = self.serializer_class(data)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
