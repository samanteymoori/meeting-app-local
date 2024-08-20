"use client";
import homepageActions from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useContext, useState } from "react";
import RoundedImage from "../Profile/RoundedImage";

const mapContainerStyle = {
  width: "md:calc(100vw - 4rem)",
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
  const [selected, setSelected] = useState<any | null>(null);

  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
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
        <>
          {editableProfiles?.currentProfile && (
            <Marker
              onClick={() => setSelected(editableProfiles?.currentProfile)}
              position={{
                lat: editableProfiles?.currentProfile?.location?.lat,
                lng: editableProfiles?.currentProfile?.location?.lng,
              }}
              draggable={false}
            ></Marker>
          )}
          {editableProfiles?.currentLocation && (
            <Marker
              onClick={() => {}}
              position={editableProfiles?.currentLocation}
              draggable={false}
            ></Marker>
          )}
          {editableProfiles?.listOfProfiles &&
            editableProfiles?.listOfProfiles.map((person) => (
              <Marker
                onClick={() => setSelected(person)}
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
                <RoundedImage src={selected.image.src} size={"medium"} />
                <h2 className="font-bold text-lg">
                  {selected.first_name} {selected.last_name}
                </h2>
              </div>
            </InfoWindow>
          )}
          {/* {editableProfiles?.currentProfile && (
            <Marker
              onClick={() => {}}
              position={{
                lat: editableProfiles?.currentProfile?.location?.lat,
                lng: editableProfiles?.currentProfile?.location?.lng,
              }}
              draggable={false}
            >
              <InfoWindow>{"test"}</InfoWindow>
            </Marker>
          )} */}
          {/* {editableProfiles?.listOfProfiles &&
            editableProfiles?.listOfProfiles.map((person) => (
              <>
                <div
                  onClick={() => {
                    dispatch?.({
                      type: homepageActions.setProfile,
                      payload: person,
                    });
                  }}
                >
                  <Marker
                    position={{
                      lat: person.location?.lat,
                      lng: person.location?.lng,
                    }}
                    draggable={false}
                  >
                    <InfoWindow
                    // onClick={() => {
                    //   dispatch?.({
                    //     type: homepageActions.setProfile,
                    //     payload: person,
                    //   });
                    // }}
                    >
                      <RoundedImage src={person.image.src} size={"small"} />
                    </InfoWindow>
                  </Marker>
                </div>
              </>
            ))} */}
        </>
      </GoogleMap>
    </div>
  );
};
export default Map;
