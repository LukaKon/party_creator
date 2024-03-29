import os

import django
# from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')
# settings.configure()
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chat.routing
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack



# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')
# django.setup()

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JWTAuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns,
        ),
    )})
