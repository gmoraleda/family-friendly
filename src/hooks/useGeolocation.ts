export function useGeolocation(
  mapRef: React.MutableRefObject<google.maps.Map | null>
) {
  return function centerOnUser() {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        mapRef.current?.setCenter(pos);
        mapRef.current?.setZoom(12);
      },
      () => console.error("Error getting user location")
    );
  };
}
