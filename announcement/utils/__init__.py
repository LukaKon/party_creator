import googlemaps

from party_creator.settings import GOOGLE_API_KEY

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)


def get_lat_lng(location):
    return gmaps.places(query=location).get("results")[0]["geometry"]["location"]
