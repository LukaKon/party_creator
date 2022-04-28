from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

app_name = "announcement"

urlpatterns = [
    path("announcements/", views.AnnouncementView.as_view(), name="announcements_list"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
