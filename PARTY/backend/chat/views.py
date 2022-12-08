from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Message
from .serializers import MessageSerializer


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
        print('queryset', queryset)
        return queryset

    def post(self, request):
        data = self.get_queryset()
        serialized_data = self.serializer_class(data, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
