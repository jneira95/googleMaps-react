import React from "react";
import styles from "./map.module.scss";

type DivProps = JSX.IntrinsicElements["div"];

const MapContainer = React.forwardRef<HTMLDivElement, DivProps>(
  (_props, ref) => {
    return <div ref={ref} className={styles.map} />;
  }
);

export default MapContainer;
