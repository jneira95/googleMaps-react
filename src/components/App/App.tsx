import React from "react";
import Map from "../Common/Map/Map";
import SearchBox from "../Common/SearchBox/SearchBox";
import styles from "./app.module.scss";

const App: React.FC<{}> = () => {
  const mapContainerRef = React.createRef<HTMLDivElement>();

  return (
    <div className={styles.root}>
      <SearchBox />
      <Map mapContainerRef={mapContainerRef} />
    </div>
  );
};

export default App;
