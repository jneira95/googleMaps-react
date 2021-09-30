import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  version: "weekly",
});

const getCurrentPosition = (map: google.maps.Map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        map.setZoom(15);
      }
    );
  }
};

export const loadMap = async (
  mapContainer: HTMLDivElement,
  position: Position
) => {
  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(mapContainer as HTMLElement, {
        center: position,
        zoom: 13,
      });
      getCurrentPosition(map);
    })
    .catch((error) => {
      console.error(error);
    });
};
