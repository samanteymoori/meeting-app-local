"use client";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

const mapContainerStyle = {
  width: "calc(100vw - 4rem)",
  height: "100vh",
};

const center = {
  lat: 49.2827, // Vancouver latitude
  lng: -123.1207, // Vancouver longitude
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const locations = [
  { lat: 49.2827, lng: -123.1207 },
  { lat: 49.29, lng: -123.13 },
  // Add more locations as needed
];

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Add your API key here
  });

  if (loadError) return <div>{"Error loading maps"}</div>;
  if (!isLoaded) return <div>{"Loading Maps"}</div>;

  return (
    <div className="rounded-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
export default Map;
