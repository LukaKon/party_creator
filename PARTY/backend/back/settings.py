"""
Django settings for back project.
"""
import os
from datetime import timedelta
from pathlib import Path

from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", 'secret_key')

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    default='*',
    cast=lambda v: [s.strip() for s in v.split(' ')]
)

# Application definition

PROJECT_APPS = [
    "account.apps.AccountConfig",
    "announcement.apps.AnnouncementConfig",
    "chat.apps.ChatConfig",
]

ADDITIONAL_APPS = [
    "corsheaders",
    "django_extensions",
    "django_filters",
    'django_rest_passwordreset',
    "drf_spectacular",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
]

STANDARD_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

FIRST_APPS = [
    "channels",
    'daphne',
]

INSTALLED_APPS = FIRST_APPS + STANDARD_APPS + PROJECT_APPS + ADDITIONAL_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# CORS_ORIGIN_ALLOW_ALL = False

# CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'http://0.0.0.0:3000',
    'http://0.0.0.0:8000',
]

CSRF_TRUSTED_ORIGINS = [
    "https://localhost:3000",
    "http://localhost:3000",
    "https://localhost:8000",
    "http://localhost:8000",
    'https://127.0.0.1:3000',
    'http://127.0.0.1:3000',
    'https://127.0.0.1:8000',
    'http://0.0.0.0:3000',
    'https://0.0.0.0:3000',
    'http://0.0.0.0:8000',
    'https://0.0.0.0:8000',
]

ROOT_URLCONF = "back.urls"

ASGI_APPLICATION = "back.asgi.application"
WSGI_APPLICATION = "back.wsgi.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(
                config('REDIS_HOST', '192.168.1.82'),
                config('REDIS_PORT', 6379)
            )]
        }
    }
}

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DATABASE_NAME", "party"),
        "HOST": config("DB_HOST", "192.168.1.82"),
        "USER": config("DATABASE_USER", "party"),
        "PASSWORD": config("DATABASE_PASSWORD", "password"),
        "PORT": config("DB_PORT", "5432"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 5,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

# LANGUAGE_CODE = 'en-us'

LANGUAGE_CODE = "pl"
LANGUAGES = (
    ("pl", "polski"),
    ("en", "angielski"),
)

# TIME_ZONE = 'UTC'
TIME_ZONE = "Europe/Warsaw"  # 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

STATICFILES_DIRS = []

STATIC_ROOT = BASE_DIR / "staticfiles"

# location where the media (profile pic) are stored
MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = "/media/"  # url that will serve media files

AUTH_USER_MODEL = "account.User"

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend"
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    # "DEFAULT_PERMISSION_CLASSES": (
    #     'rest_framework.permissions.AllowAny',
    # ),
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 'PAGE_SIZE': 5,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SIMPLE_JWT = {
    # "ACCESS_TOKEN_LIFETIME": timedelta(hours=10, minutes=5),
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1, minutes=0),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    # "ROTATE_REFRESH_TOKENS": True,
    # "BLACKLIST_AFTER_ROTATION": True,

    # "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    # "VERIFYING_KEY": None,

    "AUTH_HEADER_TYPES": ("JWT",),
    # "USER_ID_FIELD": "id",  # TODO: -> email?
    # "USER_ID_CLAIM": "user_id",  # TODO: -> email?
    # "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # "TOKEN_TYPE_CLAIM": "token_type",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Party creator service",
    "DESCRIPTION": "Service that help to arange every kind of event",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

# Emailing settings

DEBUG = config("DEBUG", default=False, cast=bool)

if DEBUG:
    # development only
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_FROM = os.getenv("EMAIL_ADDRESS")
EMAIL_HOST_USER = os.getenv("EMAIL_ADDRESS")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_PORT = 587
EMAIL_USE_TLS = True

PASSWORD_RESET_TIMEOUT = 14400
