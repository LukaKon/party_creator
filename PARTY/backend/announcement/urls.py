from django.urls import path

from . import views

app_name = "announcement"

urlpatterns = [
    path("announcements/", views.AnnouncementView.as_view(), name="announcements_list"),
]