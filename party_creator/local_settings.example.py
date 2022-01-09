# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

import environ
env=environ.Env(DEBUG=(bool,False))
environ.Env.read_env(env_file='.env')

DATABASES = {
    "default": {
        # "ENGINE": "django.db.backends.postgresql_psycopg2",
        "ENGINE":'django.contrib.gis.db.backends.postgis',
        'NAME':env('DATABASE_NAME'),
        "HOST": env("PG_HOST"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "PORT": env('PG_PORT'),
    }
}

GOOGLE_API_KEY = "AIzaSyBMvS96FedoeGa8Ec7HeygGYiSPWVNyzhY"
