/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSearchBoxPredictions } from "../../../store/map/mapScript";
import mapSlice from "../../../store/map/mapSlice";
import { AppState } from "../../../store/store";
import styles from "./searchBox.module.scss";

interface SearchBoxProps {
  updateSearch: (value: string) => void;
  savePredictionOption: (placeId: PlaceId) => void;
  getPredictions: (position: Position, guestSearch: string) => void;
  guestSearch: string;
  position: Position;
  searchPredictions: google.maps.places.AutocompletePrediction[] | null;
}

export const UnconnectedSearchBox: React.FC<SearchBoxProps> = ({
  updateSearch,
  savePredictionOption,
  getPredictions,
  guestSearch,
  position,
  searchPredictions,
}) => {
  const [inputValue, setInputValue] = useState<string>(guestSearch);

  useEffect(() => {
    const timeOutUpdate = setTimeout(() => {
      updateSearch(inputValue);
      inputValue && getPredictions(position, inputValue);
    }, 300);
    return () => clearTimeout(timeOutUpdate);
  }, [inputValue]);

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={`${styles.root} ${guestSearch ? styles.shadow : ""}`}>
      <input
        type="search"
        id="gsearch"
        name="gsearch"
        placeholder="Search"
        aria-label="search-input"
        className={`${styles.input} ${guestSearch ? styles.isListActive : ""}`}
        onChange={handleUpdate}
        defaultValue={guestSearch}
      />
      {searchPredictions && searchPredictions.length > 0 && guestSearch && (
        <ul className={styles.list}>
          {searchPredictions.map(({ structured_formatting, place_id }) => (
            <li key={place_id} className={styles.item}>
              <button
                className={styles.button}
                onClick={() => {
                  savePredictionOption(place_id);
                }}
              >
                <i className={`fas fa-search-location ${styles.icon}`}></i>
                <p className={styles.text}>{structured_formatting.main_text}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchBox = connect(
  (state: AppState) => ({
    guestSearch: state.maps.guestSearch,
    position: state.maps.position,
    searchPredictions: state.maps.searchPredictions,
    getPredictions: getSearchBoxPredictions,
  }),
  {
    savePredictionOption: mapSlice.actions.savePredictionOption,
    updateSearch: mapSlice.actions.updateSearch,
  }
)(UnconnectedSearchBox);

export default SearchBox;
