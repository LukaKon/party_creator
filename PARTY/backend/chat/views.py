from django.views.generic import ListView
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer


class GetMessageView(ListView):
    model = Message

    # def get_queryset(self):
    #     queryset = get_user_model().objects.get(
    #         email=self.request.user.email
    #     )
    #     queryset = queryset.sent_message
    #     return queryset

    # def post(self, request):
    #     queryset = self.get_queryset()
    #     recipient_id = request.data.get('recipient')
    #     data = queryset.filter(recipient_id=recipient_id)
    #     serialized_data = MessageSerializer(data)
    #     return Response(serialized_data, status=status.HTTP_200_OK)
