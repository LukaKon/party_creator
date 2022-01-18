from rest_framework import serializers
from .models import Announcement

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model=Announcement
        fields=('id','title','description','user','category','event_type','city')