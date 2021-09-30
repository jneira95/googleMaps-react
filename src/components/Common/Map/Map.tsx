import React, { useCallback, useEffect, useRef } from "react";
import { loadMap } from "../../../api/maps";
import styles from "./map.module.scss";

export const Map: React.FC<MapProps> = ({ position }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const initMap = useCallback(() => {
    mapContainer.current && loadMap(mapContainer.current, position);
  }, [position]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <div ref={mapContainer} className={styles.map} />;
};

export default Map;
