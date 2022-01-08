"""
Django settings for party_creator project.

Generated by 'django-admin startproject' using Django 3.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
import party_creator.local_settings

BASE_DIR = Path(__file__).resolve().parent.parent


env=environ.Env(DEBUG=(bool,False))

environ.Env.read_env(env_file='.env')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = "django-insecure-#c13jyes32=3z7r@=4b0@tngds9va)a6a3#@_m6)!%&8t_va@5"
SECRET_KEY=env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
DEBUG=env('DEBUG')

if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"  # development only


ALLOWED_HOSTS = env("ALLOWED_HOSTS").split(" ")
# ALLOWED_HOSTS = []
# ALLOWED_HOSTS = ['*']
# ALLOWED_HOSTS = ['localhost','127.0.0.1']


# Application definition
MY_APPS = [
    "django_extensions",
    "account.apps.AccountConfig",
    "announcement.apps.AnnouncementConfig",
    "party_wizard.apps.PartyWizardConfig",
]


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    'django.contrib.gis'
] + MY_APPS


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "party_creator.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
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

WSGI_APPLICATION = "party_creator.wsgi.application"

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "pl"
LANGUAGES = (
    ("pl", "polski"),
    ("en", "angielski"),
)

TIME_ZONE = "Europe/Warsaw"  #'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = "account.User"
LOGIN_REDIRECT_URL = "announcement:home"
LOGIN_URL = "account:login"
LOGOUT_URL = "account:logout"

# emails
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
# https://docs.djangoproject.com/en/2.2/howto/static-files/#configuring-static-files
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

# location where the media (profile pic) are stored
MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = "/media/"  # url that will serve media files

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

try:
    from party_creator.local_settings import DATABASES
except ModuleNotFoundError:
    print("Brak konfiguracji bazy danych w pliku local_settings.py!")
    print("Uzupełnij dane i spróbuj ponownie!")
    exit(0)

GOOGLE_API_KEY = party_creator.local_settings.GOOGLE_API_KEY
