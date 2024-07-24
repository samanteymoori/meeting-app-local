"use client";
import { placesList } from "@/mocks/place-list";
import { profileList } from "@/mocks/profile-list";
import { PropsWithChildren, useReducer } from "react";
import { meetingStep } from "./homepageActions";
import { HomePageContext } from "./HomePageContext";
import homepageReducer from "./homepageReducer";

const HomePageContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [editableProfiles, dispatch] = useReducer(homepageReducer, {
    listOfProfiles: profileList,
    currentProfile: profileList[3],
    authenticatedProfile: profileList[1],
    places: placesList,
    currentPlace: placesList[0],
    meetingPlace: null,
    step: meetingStep.book,
  }) as any;

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
