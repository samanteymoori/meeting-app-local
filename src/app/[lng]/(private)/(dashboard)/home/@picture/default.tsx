"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { profileList } from "@/mocks/profile-list";
import { useContext } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { dispatch, editableProfiles } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <div>
      <RoundedImage
        src={editableProfiles?.currentProfile.src || ""}
        size={"large"}
      />
    </div>
  );
};
export default Default;
