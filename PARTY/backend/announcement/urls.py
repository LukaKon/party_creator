
from django.urls import path

from . import views

app_name = "announcement"

urlpatterns = [
    # announcements
    path(
        route="announcements/",
        view=views.AnnouncementListView.as_view(),
        name="announcement_api",
    ),
    path(
        route="addannouncement/",
        view=views.AnnouncementCraeteView.as_view(),
        name="add_announcement",
    ),
    path(
        route="announcement/<uuid:uuid>/",
        view=views.AnnouncementRetriveUpdateDestroyAPIView.as_view(),
        name="announcement_api",
    ),
    # categories
    path(
        route="categories/", view=views.CategoryListView.as_view(), name="category_api"
    ),
]
