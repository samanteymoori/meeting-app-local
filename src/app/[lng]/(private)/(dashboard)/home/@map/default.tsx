"use client";
import Map from "@/components/Map/Map";
import MeetPlaceMap from "@/components/Map/MeetPlaceMap";
import OpenMap from "@/components/Map/OpenMap";
import { useContext } from "react";
import { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <div className="col-span-6 h-full  h-full bg-white  grid grid-cols-1">
      <div className="bg-white rounded-lg">
        <div className="">
          {(editableProfiles?.step === meetingStep.find ||
            editableProfiles?.step === meetingStep.book) && <Map />}
        </div>
      </div>
    </div>
  );
};
export default Default;
