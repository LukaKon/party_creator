import random
import string

import googlemaps
from django.utils.text import slugify

from party_creator.settings import GOOGLE_API_KEY

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    """Generate random sufix (string) for slug."""
    return "".join(random.choice(chars) for _ in range(size))


def unique_slug_generator(instance, new_slug=None):
    """Generate unique slug.

        instance: object (Announcement) for which function create unique slug
    Returns:
        [slug]: [unique slug]
    """

    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.title)

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        new_slug = f"{slug}-{random_string_generator(size=4)}"
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug


def get_lat_lng(location):
    return gmaps.places(query=location).get("results")[0]["geometry"]["location"]
