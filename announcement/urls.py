from django.contrib.auth import views as auth_views
from django.urls import path, re_path
from django.views.generic import TemplateView

from announcement import views

app_name = "announcement"

urlpatterns = [
    # path("", views.HomeView.as_view(), name="home"),

    # contact with administration
    path("contact/", views.ContactView.as_view(), name="contact"),

    # announcement
    path(
        "add_announcement/",
        views.AddAnnouncementView.as_view(),
        name="add_announcement",
    ),
    path(
        "announcement_details/<slug:slug>/",
        views.DetailsAnnouncementView.as_view(),
        name="announcement_details",
    ),
    path(
        "update_announcement/<slug:slug>/",
        views.UpdateAnnouncementView.as_view(),
        name="update_announcement",
    ),
    path(
        "delete_announcement/<slug:slug>/",
        views.DeleteAnnouncementView.as_view(),
        name="delete_announcement",
    ),
]
