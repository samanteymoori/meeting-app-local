"use client";
import { placesList } from "@/fixures/place-list";
import { profileList } from "@/fixures/profile-list";
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
    authenticatedProfile: profileList[1],
    places: placesList,
    currentPlace: placesList[0],
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
  };
  useEffect(() => {
    getUsers();
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
