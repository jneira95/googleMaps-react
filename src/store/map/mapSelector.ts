export const getSearchPredictionByPlaceId = (
  searchPredictions: google.maps.places.AutocompletePrediction[],
  placeId: PlaceId
) => {
  const index = searchPredictions.findIndex(
    (searchPrediction) => searchPrediction.place_id === placeId
  );

  if (index === -1) {
    throw new Error(
      "Expect selected PlaceId to be available at searchPredictions"
    );
  }

  return searchPredictions[index];
};
