"""
URLs mapping for announcement app.
"""

from announcement import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter


app_name = "announcement"

router = DefaultRouter()

router.register(
    prefix="announcements",
    viewset=views.AnnouncementViewSet,
    basename="announcement",
)
router.register(
    prefix="categories",
    viewset=views.CategoryViewSet,
    basename='category',
)
router.register(
    prefix="images",
    viewset=views.ImageViewSet,
    basename="image",
)
urlpatterns = router.urls
