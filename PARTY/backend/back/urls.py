"""
URLs mapping for backend.
"""

from announcement import urls as announcement_url
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        route="api/schema/",
        view=SpectacularAPIView.as_view(),
        name="api-schema",
    ),
    path(
        route="api/docs/",
        view=SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
    path("account/", include("account.urls", "account")),
    path("api/", include(announcement_url, "announcement")),
]
