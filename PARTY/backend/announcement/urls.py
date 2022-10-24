"""
URLs mapping for announcement app.
"""
from django.urls import path

from announcement import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.views.decorators.http import require_http_methods


app_name = "announcement"


router = DefaultRouter()

from rest_framework.routers import Route
class CustomRouter(DefaultRouter):
    routes = [
        Route(
            url=r'^{prefix}/{lookup}{trailing_slash}$',
            mapping={
                'get': 'retrieve',
                'put': 'update',
                'patch': 'partial_update',
            },
            name='{basename}-detail',
            detail=True,
            initkwargs={'suffix': 'Instance'}
        )
    ]

custom_router = CustomRouter()

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
router.register(
    prefix="favourites",
    viewset=views.FavouriteViewSet,
    basename="favourite"
)

urlpatterns = router.urls
