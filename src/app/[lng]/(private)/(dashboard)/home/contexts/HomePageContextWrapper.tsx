"use client";
import { placesList } from "@/fixures/place-list";
import { profileList } from "@/fixures/profile-list";
import { getPlaceService } from "@/services/placeService";
import { getUserService } from "@/services/userService";
import { ProfileType } from "@/types/ProfileType";
import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import homepageActions, { meetingStep } from "./homepageActions";
import { HomePageContext } from "./HomePageContext";
import homepageReducer from "./homepageReducer";

const HomePageContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [editableProfiles, dispatch] = useReducer(homepageReducer, {
    listOfProfiles: [],
    currentProfile: null,
    authenticatedProfile: [],
    places: null,
    currentPlace: null,
    meetingPlace: null,
    step: meetingStep.find,
  }) as any;
  const getUsers = async () => {
    const userService = getUserService();
    const users = await userService.getUsers();

    dispatch?.({
      type: homepageActions.setProfiles,
      payload: users.rows,
    });
    dispatch?.({
      type: homepageActions.setProfile,
      payload: users.rows?.[0],
    });
  };
  const getPlaces = async () => {
    const placeService = getPlaceService();
    const places = await placeService.getPlaces();

    dispatch?.({
      type: homepageActions.setPlaces,
      payload: places.rows,
    });
    dispatch?.({
      type: homepageActions.setPlace,
      payload: places.rows?.[0],
    });
  };
  useEffect(() => {
    getUsers();
    getPlaces();
  }, []);

  return (
    <HomePageContext.Provider
      value={{
        editableProfiles,
        dispatch,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
export default HomePageContextWrapper;
