"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useContext, useEffect } from "react";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import { posix } from "path";

interface MapProps {
  zoom?: number;
}

const defaults = {
  zoom: 12,
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom } = Map;
  const { editableProfiles } = useContext<HomePageContextType>(HomePageContext);

  return (
    <div id="map">
      <MapContainer
        center={
          editableProfiles?.currentProfile.location || [49.2609, -123.1139]
        }
        zoom={zoom}
        scrollWheelZoom={false}
        onClick={() => {}}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          onClick={() => {}}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {editableProfiles?.currentProfile && (
          <Marker
            onClick={() => {}}
            position={editableProfiles?.currentProfile.location}
            draggable={false}
          >
            <Popup>{editableProfiles?.currentProfile.education}</Popup>
          </Marker>
        )}
        {editableProfiles?.listOfProfiles &&
          editableProfiles?.listOfProfiles.map((person) => (
            <Marker
              onClick={() => {}}
              position={person.location}
              draggable={false}
            >
              <Popup>{person.education}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
