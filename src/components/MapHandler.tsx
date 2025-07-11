import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

interface Props {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

export function MapHandler({ place, marker }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    }

    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
}
export default MapHandler;
