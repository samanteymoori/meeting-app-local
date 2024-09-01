"use client";
import homepageActions, {
  meetingStep,
} from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import RoundedImage from "../Profile/RoundedImage";

const mapContainerStyle = {
  width: "md:calc(100vw - 4rem)",
  height: "100vh",
};

const options = {
  disableDefaultUI: true,

  zoomControl: true,
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Add your API key here
  });
  const [center, setCenter] = useState<any>({
    lat: 49.2827, // Vancouver latitude
    lng: -123.1207, // Vancouver longitude
  });
  const [selected, setSelected] = useState<any | null>(null);

  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  useEffect(() => {
    if (
      navigator.geolocation &&
      !editableProfiles?.authenticatedProfile.location
    ) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCenter({ lat: latitude, lng: longitude, accuracy });
        dispatch?.({
          type: homepageActions.setGeoLocation,
          payload: { lat: latitude, lng: longitude, accuracy },
        });
      });
    }
  }, [editableProfiles?.authenticatedProfile]);

  if (loadError) return <div>{"Error loading maps"}</div>;
  if (!isLoaded) return <div>{"Loading Maps"}</div>;
  return (
    <div className="rounded-lg ">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
      >
        {editableProfiles?.step === meetingStep.find && (
          <>
            {editableProfiles?.currentProfile && (
              <Marker
                onClick={() => {
                  setSelected(editableProfiles?.currentProfile);
                }}
                position={{
                  lat: editableProfiles?.currentProfile?.location?.lat,
                  lng: editableProfiles?.currentProfile?.location?.lng,
                }}
                draggable={false}
              ></Marker>
            )}
            {editableProfiles?.authenticatedProfile?.location && (
              <Marker
                onClick={() => {
                  setSelected(editableProfiles.authenticatedProfile);
                }}
                position={{
                  lat: editableProfiles?.authenticatedProfile.location?.lat,
                  lng: editableProfiles?.authenticatedProfile.location?.lng,
                }}
                draggable={false}
              ></Marker>
            )}
            {editableProfiles?.listOfProfiles &&
              editableProfiles?.listOfProfiles.map((person) => (
                <Marker
                  onClick={() => {
                    setSelected(person);
                  }}
                  key={person.id}
                  position={{
                    lat: person.location?.lat,
                    lng: person.location?.lng,
                  }}
                  draggable={false}
                ></Marker>
              ))}
            {selected && (
              <InfoWindow
                position={selected.location}
                onCloseClick={() => setSelected(null)}
              >
                <div
                  onClick={() => {
                    dispatch?.({
                      type: homepageActions.setProfile,
                      payload: selected,
                    });
                  }}
                  className=" text-center m-4 mt-0 "
                >
                  {selected?.image?.src && (
                    <RoundedImage src={selected.image.src} size={"medium"} />
                  )}
                  <h2 className="font-bold text-lg">
                    {selected.first_name} {selected.last_name}
                  </h2>
                </div>
              </InfoWindow>
            )}
          </>
        )}
        {editableProfiles?.step === meetingStep.book && (
          <>
            {editableProfiles?.places &&
              editableProfiles?.places.map((place) => (
                <Marker
                  onClick={() => setSelected(place)}
                  key={place.id}
                  position={{
                    lat: place.location?.lat,
                    lng: place.location?.lng,
                  }}
                  draggable={false}
                ></Marker>
              ))}
            {selected && (
              <InfoWindow
                position={selected.location}
                onCloseClick={() => setSelected(null)}
              >
                <div
                  onClick={() => {
                    dispatch?.({
                      type: homepageActions.setPlace,
                      payload: selected,
                    });
                  }}
                  className=" text-center m-4 mt-0 "
                >
                  <RoundedImage src={selected.image.src} size={"medium"} />
                  <h2 className="font-bold text-lg">{selected.name}</h2>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
};
export default Map;
