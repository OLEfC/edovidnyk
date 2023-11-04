import requests

def get_address_from_coordinates(lat, lon):
    nominatim_endpoint = "https://nominatim.openstreetmap.org/reverse"
    params = {
        "format": "json",
        "lat": lat,
        "lon": lon,
    }

    response = requests.get(nominatim_endpoint, params=params)
    data = response.json()

    if "address" in data:
        address = data["address"]
        formatted_address = ", ".join(filter(None, [
            address.get("road", None),
            address.get("suburb", None),
            address.get("city", None),
            address.get("state", None),
            address.get("country", None)
        ]))
        return formatted_address
    else:
        return "Address not found"

latitude = 52.5200  # Replace with your latitude
longitude = 13.4050  # Replace with your longitude

address = get_address_from_coordinates(latitude, longitude)
print("Address:", address)
