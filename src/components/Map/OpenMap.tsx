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
import RoundedImage from "../Profile/RoundedImage";
import homepageActions from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";

interface MapProps {
  zoom?: number;
}

const defaults = {
  zoom: 15,
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom } = Map;
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          dispatch?.({
            type: homepageActions.setGeoLocation,
            payload: { lat: latitude, lng: longitude, accuracy },
          });
        },
        (error) => {}
      );
    } else {
    }
  }, []);
  if (!editableProfiles?.currentLocation) return <></>;
  return (
    <div id="map">
      <MapContainer
        center={
          editableProfiles?.currentProfile.location ||
          editableProfiles?.currentLocation || [49.2609, -123.1139]
        }
        zoom={zoom}
        scrollWheelZoom={true}
        onClick={() => {}}
        style={{ height: "100vh", width: "calc(100vw - 4rem)" }}
      >
        <TileLayer
          onClick={() => {}}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {editableProfiles?.currentLocation && (
          <Marker
            onClick={() => {}}
            position={editableProfiles?.currentLocation}
            draggable={false}
          >
            <Popup>{"Me!"}</Popup>
          </Marker>
        )}
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
            <div
              onClick={() => {
                dispatch?.({
                  type: homepageActions.setProfile,
                  payload: person,
                });
              }}
            >
              <Marker position={person.location} draggable={false}>
                <Popup
                  onClick={() => {
                    debugger;
                    dispatch?.({
                      type: homepageActions.setProfile,
                      payload: person,
                    });
                  }}
                >
                  <RoundedImage src={person.image.src} size={"small"} />
                </Popup>
              </Marker>
            </div>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
