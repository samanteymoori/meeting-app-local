"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
  zoom: 12,
};

const MeetPlaceMap: React.FC = (Map: MapProps) => {
  const { zoom = defaults.zoom } = Map;
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
        dispatch?.({
          type: homepageActions.setGeoLocation,
          payload: { lat: latitude, lng: longitude, accuracy },
        });
      });
    }
  }, []);
  if (!editableProfiles?.currentLocation) return <></>;
  return (
    <div id="mapMeet">
      <MapContainer
        center={
          editableProfiles?.currentProfile?.location ||
          editableProfiles?.currentLocation || [49.2609, -123.1139]
        }
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {editableProfiles?.places &&
          editableProfiles?.places?.map((place) => (
            <div
              key={place.id}
              onClick={() => {
                dispatch?.({
                  type: homepageActions.setPlace,
                  payload: place,
                });
              }}
            >
              <Marker position={place.location} draggable={false}>
                <Popup
                  onClick={() => {
                    dispatch?.({
                      type: homepageActions.setPlace,
                      payload: place,
                    });
                  }}
                >
                  <RoundedImage
                    src={place.image.src}
                    size={"rectangle-small"}
                  />
                  <div>{place.name}</div>
                </Popup>
              </Marker>
            </div>
          ))}
      </MapContainer>
    </div>
  );
};

export default MeetPlaceMap;
