import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { searchPredictionsSample } from "../../../helper/testSampleData";
import { UnconnectedSearchBox } from "./SearchBox";

const updateSearch = jest.fn();
const savePredictionOption = jest.fn();
const getPredictions = jest.fn();

describe("SearchBox Component", () => {
  it("should render input element", async () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <UnconnectedSearchBox
        updateSearch={updateSearch}
        savePredictionOption={savePredictionOption}
        getPredictions={getPredictions}
        guestSearch={""}
        position={{ lat: 41.390205, lng: 2.154007 }}
        searchPredictions={[]}
      />
    );

    expect(getByPlaceholderText("Search")).toBeInTheDocument();

    const input = getByLabelText("search-input");
    fireEvent.change(input, { target: { value: "Barcelona" } });
    await waitFor(() => expect(updateSearch).toHaveBeenCalledWith("Barcelona"));
    await waitFor(() => expect(getPredictions).toHaveBeenCalledTimes(1));
  });

  it("should render prediction list", () => {
    const { getByText } = render(
      <UnconnectedSearchBox
        updateSearch={updateSearch}
        savePredictionOption={savePredictionOption}
        getPredictions={getPredictions}
        guestSearch={"Barcelona"}
        position={{ lat: 41.390205, lng: 2.154007 }}
        searchPredictions={searchPredictionsSample}
      />
    );

    expect(getByText("Barcelona–El Prat Airport (BCN)")).toBeInTheDocument();
    fireEvent.click(getByText("Barcelona–El Prat Airport (BCN)"));
    expect(savePredictionOption).toHaveBeenCalledWith(
      "ChIJpY58hGSepBIR15tv-0LpK_M"
    );
  });
});
