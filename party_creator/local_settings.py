# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
import os
from pathlib import Path
from dotenv import dotenv_values, load_dotenv
load_dotenv()
BASE_DIR = Path(__file__).resolve().parent.parent
DATABASES = {
    "default": {
        # "ENGINE": "django.db.backends.postgresql_psycopg2",
        "ENGINE":'django.contrib.gis.db.backends.postgis',
        'NAME': os.getenv("DATABASE_NAME"),
        "HOST": os.getenv("PG_HOST"),
        "USER": os.getenv("DATABASE_USER"),
        "PASSWORD": os.getenv("DATABASE_PASSWORD"),
        "PORT": os.getenv('PG_PORT'),
    }
}
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')