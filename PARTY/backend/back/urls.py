"""
URLs mapping for backend.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import (
    include,
    path,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

from announcement import urls as announcement_url
from chat import urls as chat_url

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
    path(
        'account/password_reset/',
        include('django_rest_passwordreset.urls', namespace='password_reset'),
    ),
    path("api/", include(announcement_url, "announcement")),
    path("chatapi/", include(chat_url, "chat")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
