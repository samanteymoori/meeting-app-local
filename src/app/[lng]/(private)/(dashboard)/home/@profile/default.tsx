"use client";
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
    return <PersonProfile />;
  }

  return <PlaceProfile />;
};
export default Default;
