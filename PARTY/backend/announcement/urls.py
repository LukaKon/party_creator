"""
URLs mapping for announcement app.
"""
from announcement import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework.routers import DefaultRouter

app_name = "announcement"

router = DefaultRouter()
router.register(
    prefix="announcements",
    viewset=views.AnnouncementViewSet,
    # basename="announcement_list",
)
# router.register("categories", views.CategoryListView)

urlpatterns = [
    # announcements
    path("", include(router.urls)),
    # path(
    # route="announcements/",
    # view=views.AnnouncementListView.as_view(),
    # name="announcement_list",
    # ),
    # path(
    # route="addannouncement/",
    # view=views.CreateAnnouncementView.as_view(),
    # name="add_announcement",
    # ),
    # path(
    # route="announcement/<uuid:uuid>/",
    # view=views.AnnouncementRetriveUpdateDestroyAPIView.as_view(),
    # name="announcement_api",
    # ),
    # categories
    path(
        route="categories/", view=views.CategoryListView.as_view(), name="category_api"
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
