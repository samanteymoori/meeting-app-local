"use client";
import { profileList } from "@/mocks/profile-list";
import { PropsWithChildren, useReducer } from "react";
import { meetingStep } from "./homepageActions";
import { HomePageContext } from "./HomePageContext";
import homepageReducer from "./homepageReducer";

const HomePageContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [editableProfiles, dispatch] = useReducer(homepageReducer, {
    listOfProfiles: profileList,
    currentProfile: profileList[0],
    authenticatedProfile: profileList[1],
    step: meetingStep.find,
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
