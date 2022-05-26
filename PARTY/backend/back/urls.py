"""
URLs mapping for backend.
"""

from announcement import urls as announcement_url
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# TODO: do we need this?
# template = TemplateView.as_view(template_name="index.html")

urlpatterns = [
    # path("", template),
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
