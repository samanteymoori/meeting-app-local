"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { useContext, useState } from "react";
import homepageActions from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { dispatch, editableProfiles } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <div className="flex h-24">
      {editableProfiles?.listOfProfiles?.map((profile, index) => (
        <div
          key={index}
          onClick={() =>
            dispatch?.({
              type: homepageActions.setProfile,
              payload: profile,
            })
          }
        >
          <RoundedImage src={profile.image.src} size={profile.image.size} />
        </div>
      ))}
    </div>
  );
};
export default Default;
