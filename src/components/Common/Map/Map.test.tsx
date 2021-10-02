import { render } from "@testing-library/react";
import React from "react";
import { UnconnectedMap } from "./Map";

const mapContainerRef = React.createRef<HTMLDivElement>();
const loadGoogleMap = jest.fn();
const loadMarker = jest.fn();

describe("Map Component", () => {
  it("should render elements", () => {
    const { container } = render(
      <UnconnectedMap
        mapContainerRef={mapContainerRef}
        position={{ lat: 41.390205, lng: 2.154007 }}
        placeId={null}
        markers={[]}
        searchPredictions={[]}
        loadMap={loadGoogleMap}
        loadMarker={loadMarker}
      />
    );

    expect(container.firstChild).toHaveClass("map");
    expect(loadGoogleMap).toHaveBeenCalled();
    expect(loadMarker).not.toHaveBeenCalled();
  });
});
