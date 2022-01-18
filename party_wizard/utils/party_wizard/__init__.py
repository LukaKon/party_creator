from pprint import pprint

import googlemaps

from announcement.models import Announcement, ServiceCategory
from party_creator.settings import GOOGLE_API_KEY

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)

from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance


def get_places(location, radius, type_of_places):
    lat_lng = gmaps.places(query=location).get("results")[0]["geometry"]["location"]
    location = Point(lat_lng["lat"], lat_lng["lng"], srid=4326)
    type_of_places = ServiceCategory.objects.get(name=type_of_places)
    announcements = Announcement.objects.filter(
        city__distance_lte=(location, Distance(km=radius)), category=type_of_places
    )

    return announcements

    # print(type_of_places)
    # if type_of_places == 'Restauracja':
    #     get_lat_lng = gmaps.places(query=location)
    #     lat_lng = get_lat_lng.get("results")[0]["geometry"]["location"]
    #     radius = int(radius) * 1000
    #     nearby_places = gmaps.places_nearby(
    #         location=(lat_lng["lat"], lat_lng["lng"]),
    #         type="restaurant",
    #         radius=radius,
    #     )
    #     nearby_places = nearby_places["results"]
    # else:
    #     nearby_places = []
    # return {'data': nearby_places}
