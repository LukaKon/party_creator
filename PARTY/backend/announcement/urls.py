"""
URLs mapping for announcement app.
"""

from announcement import views
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
router.register(
    prefix="favourites",
    viewset=views.FavouriteViewSet,
    basename="favourite"
)
router.register(
    prefix="movies",
    viewset=views.MovieViewSet,
    basename='movie_url',
)
router.register(
    prefix="views",
    viewset=views.ViewsViewSet,
    basename='views',
)

urlpatterns = router.urls
