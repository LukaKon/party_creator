import googlemaps

import party_creator.local_settings

gmaps = googlemaps.Client(key=party_creator.local_settings.GOOGLE_API_KEY)


def get_places(location, radius, type_of_places="restaurant"):
    get_lat_lng = gmaps.places(query=location)
    lat_lng = get_lat_lng.get("results")[0]["geometry"]["location"]
    radius = int(radius) * 1000
    nearby_places = gmaps.places_nearby(
        location=(lat_lng["lat"], lat_lng["lng"]),
        type=type_of_places,
        radius=radius,
    )

    return {"data": nearby_places}
