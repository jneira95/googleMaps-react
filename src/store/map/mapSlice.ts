import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapSliceProps {
  position: Position;
  guestSearch: string;
  markers: Marker[];
  searchPredictions: google.maps.places.AutocompletePrediction[];
  placeId: PlaceId | null;
}

const initialState: MapSliceProps = {
  //Barcelona default position
  position: { lat: 41.390205, lng: 2.154007 },
  guestSearch: "",
  markers: [],
  searchPredictions: [],
  placeId: null,
};

const mapSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    saveMarkerPosition: (state, action: PayloadAction<Marker>) => {
      state.markers.push(action.payload);
    },
    saveSearchPredictions: (
      state,
      action: PayloadAction<google.maps.places.AutocompletePrediction[]>
    ) => ({
      ...state,
      searchPredictions: action.payload,
    }),
    savePredictionOption: (state, action: PayloadAction<string>) => ({
      ...state,
      placeId: action.payload,
    }),
    updatePosition: (state, action: PayloadAction<Position>) => ({
      ...state,
      position: action.payload,
    }),
    updateSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      guestSearch: action.payload,
    }),
  },
});

export default mapSlice;
