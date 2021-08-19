import React, { useState, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoBox } from "@react-google-maps/api";

const containerStyle = {
  width: "1000px",
  height: "700px",
};

const defaultZoom = 10;
const defaultCenter = {
  lat: 43.3466252,
  lng: 42.4398009,
};

const defaultMarkerPosition={
  lat: 43.3466252,
  lng: 42.4398009,
}

const infoBoxOptions = { closeBoxURL: '', enableEventPropagation: true };

function MiniMap(props) {

  const {
    setLat,
    setLng
  } = props
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyApzvj3AYiAkv1Vr9x48zJ1NpK4DuqE-1M",
  });

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [markerPosition, setMarkerPosition] = useState(defaultMarkerPosition);
  const [markerVisibility, setMarkerVisibility] = useState(0);
  const markerHandler = () => (setMarkerPosition)

  return isLoaded ? (
    <GoogleMap className={"mapcontainer"}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      mapTypeId={"hybrid"}
      onClick={((e) => {
        return (
        setMarkerVisibility(1),
        setMarkerPosition({
        lng: e.latLng.lng(),
        lat: e.latLng.lat(),
        }),
        setLat(e.latLng.lat()),
        setLng(e.latLng.lng())
        )
      })}
    >
    <Marker
    onDrag={((e) => 
      {
    setMarkerPosition({
      lng: e.latLng.lng(),
      lat: e.latLng.lat(),
    });
    setLat(e.latLng.lat())
    setLng(e.latLng.lng())
      }
  )}
    opacity={0.9}
    clickable={true}
    draggable={true}
    position={markerPosition}
    title={"Эскалибур"}
    >
    </Marker>
    </GoogleMap>
  ) : (
    <p>No map</p>
  );
}

export default memo(MiniMap);
