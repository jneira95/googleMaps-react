type PlaceId = string;

interface Position {
  lat: number;
  lng: number;
}

interface Marker {
  position: Position;
  placeId: PlaceId;
  title: string;
}

interface MapSliceProps {
  position: Position;
  guestSearch: string;
  markers: Marker[];
  searchPredictions: google.maps.places.AutocompletePrediction[];
  placeId: PlaceId | null;
}
