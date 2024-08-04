"use client";
import UniversalDatePicker from "@/components/UniversalComponents/UniversalDatePicker";
import { useContext } from "react";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";
import PersonProfile from "./PersonProfile";
import PlaceProfile from "./PlaceProfile";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  if (editableProfiles && editableProfiles.step === meetingStep.find) {
    return <PersonProfile showButton={true} />;
  }
  if (editableProfiles && editableProfiles.step === meetingStep.meet) {
    return (
      <div className="flex h-full">
        <div className="self-center">
          <h1 className="self-center text-xl">Meet At:</h1>
          <div className="self-center mt-4">
            <UniversalDatePicker />
          </div>
          <h1 className="self-center mt-8 text-xl">Location:</h1>
          <div>{JSON.stringify(editableProfiles?.meetingPlace)}</div>
        </div>
      </div>
    );
  }

  return <PlaceProfile showButton={true} />;
};
export default Default;
