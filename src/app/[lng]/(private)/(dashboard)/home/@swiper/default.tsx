"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { useContext, useState } from "react";
import { HomePageContext } from "../contexts/HomePageContext";

const Default = () => {
  const { listOfProfiles, setCurrentProfile } = useContext(HomePageContext);
  return (
    <div className="flex">
      {listOfProfiles.map((profile, index) => (
        <div key={index} onClick={() => setCurrentProfile?.(profile)}>
          <RoundedImage src={profile.src} size={profile.size} />
        </div>
      ))}
    </div>
  );
};
export default Default;
