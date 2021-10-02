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
