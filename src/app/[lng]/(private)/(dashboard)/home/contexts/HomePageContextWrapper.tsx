"use client";
import { profileList } from "@/mocks/profile-list";
import { PropsWithChildren } from "react";
import { HomePageContext } from "./HomePageContext";

const HomePageContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <HomePageContext.Provider
      value={{
        currentProfile: null,
        listOfProfiles: profileList,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
export default HomePageContextWrapper;
