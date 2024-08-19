"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { useContext, useState } from "react";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { dispatch, editableProfiles } =
    useContext<HomePageContextType>(HomePageContext);
  if (
    editableProfiles?.step !== undefined &&
    editableProfiles.step > meetingStep.find
  ) {
    return null;
  }
  return (
    <div className="col-span-6 bg-gray-200 w-screen overflow-x-scroll h-full flex self-start p-2">
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
