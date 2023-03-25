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


class GetConversationView(APIView):
    model = Conversation
    permission_classes = (IsAuthenticated, )
    serializer_class = ConversationSerializer

    def check_data(self):
        type_fetch = self.request.data.get('type_fetch')
        announcement_id = self.request.data.get('announcement_id')
        seller_id = self.request.data.get('seller_id')
        customer_id = self.request.data.get('customer_id')
        return {
            "type_fetch": type_fetch,
            "seller_id": seller_id,
            "customer_id": customer_id,
            "announcement_id": announcement_id
        }

    def get_queryset(self):
        data = self.check_data()

        if data["type_fetch"] == 'single_conversation':
            queryset = self.model.objects.filter(
                announcement_id=data.get('announcement_id'),
                customer_id=data.get('customer_id'),
                seller_id=data.get('seller_id')
            )
        else:
            queryset = self.model.objects.filter(
                Q(customer_id=self.request.user.id) |
                Q(seller_id=self.request.user.id)
            )
        print(queryset)

        return queryset

    def post(self, request):
        data = self.get_queryset()
        serialized_data = self.serializer_class(data, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
