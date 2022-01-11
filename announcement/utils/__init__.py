import googlemaps

import party_creator.local_settings

gmaps = googlemaps.Client(key=party_creator.local_settings.GOOGLE_API_KEY)

def get_lat_lng(location):
    return gmaps.places(query=location).get("results")[0]["geometry"]["location"]