"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <div id="map">
      <MapContainer
        center={posix}
        zoom={zoom}
        scrollWheelZoom={false}
        onClick={() => {
          debugger;
        }}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          onClick={() => {
            debugger;
          }}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          onClick={() => {
            debugger;
          }}
          position={posix}
          draggable={false}
        >
          <Popup>Hey ! I study here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
