/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMap,
  getPlaceIdPosition,
  loadNewMarker,
} from "../../../store/map/mapScript";
import { getSearchPredictionByPlaceId } from "../../../store/map/mapSelector";
import { AppState } from "../../../store/store";
import { MapContainer } from "./MapContainer";

interface MapProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  position: Position;
  placeId: PlaceId | null;
  markers: Marker[];
  searchPredictions: google.maps.places.AutocompletePrediction[];
}

export const UnconnectedMap: React.FC<MapProps> = ({
  mapContainerRef,
  position,
  placeId,
  markers,
  searchPredictions,
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
    markers.length > 0 && map && loadNewMarker(map, markers);
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
}))(UnconnectedMap);

export default Map;
