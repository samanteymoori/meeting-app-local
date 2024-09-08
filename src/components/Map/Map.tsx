"use client";
import homepageActions, {
  meetingStep,
} from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import { getUserService, UserService } from "@/services/userService";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
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
  const [zoom, setZoom] = useState<number>(15);

  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  useEffect(() => {
    if (
      editableProfiles?.step === meetingStep.find &&
      editableProfiles?.currentProfile?.location
    ) {
      setCenter(editableProfiles?.currentProfile.location);
      setSelected(editableProfiles?.currentProfile);
    } else if (
      editableProfiles?.step === meetingStep.book &&
      editableProfiles?.currentPlace.location
    ) {
      if (editableProfiles?.currentPlace?.location) {
        setCenter(editableProfiles?.currentPlace.location);
      }
    } else if (
      editableProfiles?.step === meetingStep.detail &&
      editableProfiles?.meetingRecord?.place_location
    ) {
      setZoom(17);
      setSelected(
        editableProfiles.places.find(
          (p) => p.id === editableProfiles.meetingRecord.place_id
        )
      );
      setCenter({
        lat: editableProfiles.meetingRecord.place_location.x,
        lng: editableProfiles.meetingRecord.place_location.y,
      });
    }
  }, [
    editableProfiles?.currentProfile,
    editableProfiles?.currentPlace,
    editableProfiles?.step,
    editableProfiles?.meetingRecord?.place_location,
  ]);

  useEffect(() => {
    setSelected(null);
    if (
      editableProfiles?.step === meetingStep.detail &&
      editableProfiles?.meetingRecord?.location
    ) {
      // if (editableProfiles?.meetingRecord?.place_location) {
      //   alert(JSON.stringify(editableProfiles?.meetingRecord?.place_location));
      //   setCenter(editableProfiles?.meetingRecord?.place_location);
      // }
    }
  }, [editableProfiles?.step]);
  useEffect(() => {
    if (!selected?.location || !selected.name) return;

    dispatch?.({
      type: homepageActions.setPlace,
      payload: selected,
    });
  }, [selected]);
  useEffect(() => {
    if (editableProfiles?.step === meetingStep.detail) return;
    if (
      navigator.geolocation &&
      !editableProfiles?.authenticatedProfile.location
    ) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCenter({ lat: latitude, lng: longitude, accuracy });
        const userService = getUserService();
        if (!editableProfiles?.authenticatedProfile.id) return;
        userService.updateLocation({
          id: editableProfiles?.authenticatedProfile.id,
          location: { lat: latitude, lng: longitude, accuracy },
        });
        // const service = new window.google.maps.places.PlacesService(
        //   document.createElement("div")
        // );

        const request: any = {
          location: { lat: latitude, lng: longitude },
          radius: "50", // Search within 50 meters
        };

        // service.nearbySearch(request, (results: any, status: any) => {
        //   if (
        //     status === window.google.maps.places.PlacesServiceStatus.OK &&
        //     results.length > 0
        //   ) {
        //     // setPlaceInfo(results[0]); // Get the first place's info
        //   } else {
        //     // setPlaceInfo(null);
        //   }
        // });

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
        zoom={zoom}
        center={center}
        options={options}
      >
        {editableProfiles?.directions && (
          <DirectionsRenderer directions={editableProfiles?.directions} />
        )}
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
            {selected && selected.location && (
              <div className="-mt-4">
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
                    <input
                      onClick={() => {
                        dispatch?.({
                          type: homepageActions.pickPersonToMeet,
                          payload: editableProfiles?.currentProfile,
                        });
                        setSelected(null);
                      }}
                      type={"button"}
                      className="bg-green-500 mt-4 cursor-pointer text-white p-4   "
                      value={"Meet " + selected.first_name}
                    />
                  </div>
                </InfoWindow>
              </div>
            )}
          </>
        )}
        {(editableProfiles?.step === meetingStep.book ||
          editableProfiles?.step === meetingStep.detail) && (
          <>
            {editableProfiles?.places &&
              editableProfiles?.places
                ?.filter(
                  (p) =>
                    p.id === editableProfiles?.meetingRecord?.place_id ||
                    editableProfiles.step !== meetingStep.detail
                )
                .map((place) => (
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
            {selected && selected.location && (
              <InfoWindow
                position={selected.location}
                onCloseClick={() => setSelected(null)}
              >
                <div className=" text-center m-4 mt-0 ">
                  <RoundedImage src={selected.image.src} size={"medium"} />
                  <h2 className="font-bold text-lg">{selected.name}</h2>
                  {editableProfiles.step !== meetingStep.detail && (
                    <input
                      onClick={() => {
                        dispatch?.({
                          type: homepageActions.pickPlaceToMeet,
                          payload: editableProfiles?.currentLocation,
                        });
                        setSelected(null);
                      }}
                      type={"button"}
                      className="bg-green-500 cursor-pointer text-white p-4   "
                      value={"Meet at " + selected.name}
                    />
                  )}
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
