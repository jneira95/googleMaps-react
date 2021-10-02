/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPlaceIdPosition,
  loadGoogleMap,
  loadNewMarker,
} from "../../../store/map/mapScript";
import { getSearchPredictionByPlaceId } from "../../../store/map/mapSelector";
import { AppState } from "../../../store/store";
import MapContainer from "./MapContainer";

interface MapProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  position: Position;
  placeId: PlaceId | null;
  markers: Marker[];
  searchPredictions: google.maps.places.AutocompletePrediction[];
  loadMap: (
    mapContainer: HTMLDivElement,
    position: Position,
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>
  ) => Promise<void>;
  loadMarker: (map: google.maps.Map, markers: Marker[]) => void;
}

export const UnconnectedMap: React.FC<MapProps> = ({
  mapContainerRef,
  position,
  placeId,
  markers,
  searchPredictions,
  loadMap,
  loadMarker,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initMap = useCallback(() => {
    mapContainerRef.current &&
      loadMap(mapContainerRef.current, position, setMap);
  }, [position]);

  useEffect(() => {
    placeId &&
      map &&
      getPlaceIdPosition(
        map,
        placeId,
        markers,
        getSearchPredictionByPlaceId(searchPredictions, placeId)
      );
  }, [placeId]);

  useEffect(() => {
    markers.length > 0 && map && loadMarker(map, markers);
  }, [markers]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <MapContainer ref={mapContainerRef} />;
};

const Map = connect((state: AppState) => ({
  position: state.maps.position,
  placeId: state.maps.placeId,
  markers: state.maps.markers,
  searchPredictions: state.maps.searchPredictions,
  loadMap: loadGoogleMap,
  loadMarker: loadNewMarker,
}))(UnconnectedMap);

export default Map;
