import { Loader } from "@googlemaps/js-api-loader";
import store from "../store";
import { ERROR_STATUS } from "./constant";
import mapSlice from "./mapSlice";

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  version: "weekly",
  libraries: ["places"],
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

const getMapOptions = (position: Position): google.maps.MapOptions => ({
  center: position,
  zoom: 13,
  disableDefaultUI: true,
  mapTypeId: "roadmap",
});

const predictionsSuggestions = (
  predictions: google.maps.places.AutocompletePrediction[] | null,
  status: google.maps.places.PlacesServiceStatus
) => {
  if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
    let error = "";

    switch (status) {
      case "INVALID_REQUEST":
        error = ERROR_STATUS.INVALID_REQUEST;
        break;
      case "NOT_FOUND":
        error = ERROR_STATUS.NOT_FOUND;
        break;
      case "OVER_QUERY_LIMIT":
        error = ERROR_STATUS.OVER_QUERY_LIMIT;
        break;
      case "REQUEST_DENIED":
        error = ERROR_STATUS.REQUEST_DENIED;
        break;
      case "UNKNOWN_ERROR":
        error = ERROR_STATUS.UNKNOWN_ERROR;
        break;
      case "ZERO_RESULTS":
        error = ERROR_STATUS.ZERO_RESULTS;
        break;
    }
    console.log(error);
  } else {
    store.dispatch(mapSlice.actions.saveSearchPredictions(predictions));
  }
};

const setMarker = (map: google.maps.Map, marker: Position, title: string) => {
  new google.maps.Marker({
    map,
    position: marker,
    title,
  });

  map.setCenter(marker);
  map.setZoom(15);
};

const setMarkerPosition = (map: google.maps.Map, position: Position) => {
  map.setCenter(position);
  map.setZoom(15);
};

export const getSearchBoxPredictions = (
  position: Position,
  guestSearch: string
) => {
  const autoCompleteService = new google.maps.places.AutocompleteService();

  autoCompleteService.getPlacePredictions(
    {
      input: guestSearch,
      radius: 50000,
      location: new google.maps.LatLng(position.lng, position.lng),
    },
    predictionsSuggestions
  );
};

export const loadGoogleMap = async (
  mapContainer: HTMLDivElement,
  position: Position,
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>
) => {
  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(
        mapContainer as HTMLElement,
        getMapOptions(position)
      );

      getCurrentPosition(map);
      setMap(map);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPlaceIdPosition = (
  map: google.maps.Map,
  placeId: PlaceId,
  markers: Marker[],
  searchPrediction: google.maps.places.AutocompletePrediction
) => {
  const request = {
    placeId: placeId,
    fields: ["geometry"],
  };

  const service = new google.maps.places.PlacesService(map);

  service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      let isMarkerAlreadySave = false;

      markers.forEach((marker) => {
        if (marker.placeId === placeId) isMarkerAlreadySave = true;
      });

      if (isMarkerAlreadySave) {
        setMarkerPosition(map, position);
      } else {
        store.dispatch(
          mapSlice.actions.saveMarkerPosition({
            position,
            placeId,
            title: searchPrediction.structured_formatting.main_text,
          })
        );
      }
    }
  });
};

export const loadNewMarker = (map: google.maps.Map, markers: Marker[]) => {
  const lastMarker = markers[markers.length - 1];
  setMarker(map, lastMarker.position, lastMarker.title);
};
