"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useContext, useEffect, useState } from "react";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import RoundedImage from "../Profile/RoundedImage";
import homepageActions, {
  meetingStep,
} from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { getUserService } from "@/services/userService";

interface MapProps {
  zoom?: number;
}

const defaults = {
  zoom: 12,
};

const Map: React.FC = (Map: MapProps) => {
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

  if (editableProfiles?.step === meetingStep.meet) return <></>;

  return (
    <div id="map">
      <MapContainer
        center={
          editableProfiles?.currentProfile?.location ||
          editableProfiles?.currentLocation || [49.2609, -123.1139]
        }
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "calc(100vw - 4rem)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {editableProfiles?.directions && (
          <></>
          // <DirectionsRenderer directions={editableProfiles?.directions} />
        )}
        {editableProfiles?.step === meetingStep.find && (
          <>
            {editableProfiles?.currentProfile && (
              <>
                <Marker
                  eventHandlers={{
                    click: () => setSelected(editableProfiles?.currentProfile),
                  }}
                  position={{
                    lat: editableProfiles?.currentProfile?.location?.lat,
                    lng: editableProfiles?.currentProfile?.location?.lng,
                  }}
                  draggable={false}
                ></Marker>
              </>
            )}
            {editableProfiles?.authenticatedProfile?.location && (
              <Marker
                eventHandlers={{
                  click: () =>
                    setSelected(editableProfiles.authenticatedProfile),
                }}
                position={{
                  lat:
                    editableProfiles?.authenticatedProfile?.location?.lat || 0,
                  lng:
                    editableProfiles?.authenticatedProfile?.location?.lng || 0,
                }}
                draggable={false}
              ></Marker>
            )}
            {editableProfiles?.listOfProfiles &&
              editableProfiles?.listOfProfiles.map((person) => (
                <Marker
                  eventHandlers={{
                    click: () => setSelected(person),
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
                <Popup
                  position={selected.location}
                  eventHandlers={{
                    click: () => setSelected(null),
                  }}
                >
                  <div
                    onClick={(e) => {
                      dispatch?.({
                        type: homepageActions.setProfile,
                        payload: selected,
                      });
                      e.stopPropagation();
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
                      onClick={(e) => {
                        dispatch?.({
                          type: homepageActions.pickPersonToMeet,
                          payload: editableProfiles?.currentProfile,
                        });
                        setSelected(null);
                        e.stopPropagation();
                      }}
                      type={"button"}
                      className="bg-green-500 mt-4 cursor-pointer text-white p-4   "
                      value={"Meet " + selected.first_name}
                    />
                  </div>
                </Popup>
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
              <Popup
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
              </Popup>
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
