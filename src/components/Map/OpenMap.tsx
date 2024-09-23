"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
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
import { LocationIQProvider } from "leaflet-geosearch";
import { getPlaceService } from "@/services/placeService";

interface MapProps {
  zoom?: number;
}

const defaults = {
  zoom: 12,
};

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [label, setLabel] = useState("");

  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  // Hook to listen for map events like clicks
  useMapEvents({
    click(e) {
      setPosition(e.latlng); // Set the position when the map is clicked
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <input
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              const placeService = getPlaceService();
              placeService
                .addPlace({
                  name: label,
                  location: position,
                } as any)
                .then((result: any) => {
                  const newPlace = {
                    location: position,
                    name: label,
                    id: result.response.place_id,
                    image: { src: "" },
                  };
                  dispatch?.({
                    type: homepageActions.addPlace,
                    payload: newPlace,
                  });
                  dispatch?.({
                    type: homepageActions.setPlace,
                    payload: newPlace,
                  });
                });
            }
          }}
          onChange={(e) => setLabel(e.target.value)}
          value={label}
          placeholder={"create a new location"}
        />
      </Popup>
    </Marker>
  );
};
const Map: React.FC = (Map: MapProps) => {
  const [center, setCenter] = useState<any>({
    lat: 49.2827, // Vancouver latitude
    lng: -123.1207, // Vancouver longitude
  });
  const [selected, setSelected] = useState<any | null>(null);
  const [zoom, setZoom] = useState<number>(18);

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
    setSelected(editableProfiles?.newPlace);
  }, [editableProfiles?.newPlace]);
  useEffect(() => {
    setSelected(null);
    if (editableProfiles?.step === meetingStep.book) {
      setSelected(editableProfiles.places?.[0]);
    }
    if (
      editableProfiles?.step === meetingStep.detail &&
      editableProfiles?.meetingRecord?.location
    ) {
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

        const request: any = {
          location: { lat: latitude, lng: longitude },
          radius: "50", // Search within 50 meters
        };

        dispatch?.({
          type: homepageActions.setGeoLocation,
          payload: { lat: latitude, lng: longitude, accuracy },
        });
      });
    }
  }, [editableProfiles?.authenticatedProfile]);

  if (editableProfiles?.step === meetingStep.meet) return <></>;

  return (
    <>
      <div id="map" className="w-[90vw] mx-auto rounded-lg">
        <MapContainer
          zoomAnimation={true}
          boxZoom={true}
          center={selected || center}
          zoom={zoom}
          touchZoom={true}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "100vh" }}
        >
          <TileLayer
            eventHandlers={{
              click: () => {},
            }}
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
                      click: () =>
                        setSelected(editableProfiles?.currentProfile),
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
                      editableProfiles?.authenticatedProfile?.location?.lat ||
                      0,
                    lng:
                      editableProfiles?.authenticatedProfile?.location?.lng ||
                      0,
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
                    // eventHandlers={{
                    //   click: () => setSelected(null),
                    // }}
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
                        <RoundedImage
                          src={selected.image.src}
                          size={"medium"}
                        />
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
                          // setSelected(null);
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
                      eventHandlers={{
                        click: () => {
                          setSelected(place);
                        },
                      }}
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
                  closeOnClick={false}
                  autoClose={false}
                  position={selected.location}
                  // eventHandlers={{
                  //   click: () => setSelected(null),
                  // }}
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
                          // setSelected(null);
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
          {editableProfiles?.step === meetingStep.book && <LocationMarker />}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
