import mapSlice from "./mapSlice";

const { updateSearch, updatePosition, saveMarkerPosition } = mapSlice.actions;

describe("mapSlice", () => {
  const initialState: MapSliceProps = {
    position: { lat: 41.390205, lng: 2.154007 },
    guestSearch: "",
    markers: [],
    searchPredictions: [],
    placeId: null,
  };

  it("should updatePosition with the new given value", () => {
    const result = mapSlice.reducer(initialState, {
      type: updatePosition.type,
      payload: { lat: 41, lng: 2 },
    });

    expect(result).toEqual({
      ...initialState,
      position: { lat: 41, lng: 2 },
    });
  });

  it("should updateSearch with the new input value", () => {
    const result = mapSlice.reducer(initialState, {
      type: updateSearch.type,
      payload: "Barcelona",
    });

    expect(result).toEqual({
      ...initialState,
      guestSearch: "Barcelona",
    });
  });

  it("should saveMarkerPosition with the new input value", () => {
    const result = mapSlice.reducer(initialState, {
      type: saveMarkerPosition.type,
      payload: {
        position: { lat: 41, lng: 2 },
        placeId: "ouh93nva97sd4#as",
        title: "Barcelona",
      },
    });

    expect(result).toEqual({
      ...initialState,
      markers: [
        {
          position: { lat: 41, lng: 2 },
          placeId: "ouh93nva97sd4#as",
          title: "Barcelona",
        },
      ],
    });
  });
});
