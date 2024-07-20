"use client";
import { useContext } from "react";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  const { firstName, lastName, weight, height, hobbies, education, job }: any =
    editableProfiles?.currentProfile;
  return (
    <div className="  h-full  rounded-lg grid gap-x-4 gap-y-2 [&>*]:p-4 [&>*]:flex-auto flex">
      <h1 className="col-span-2 xl:col-span-4 text-2xl text-green-500 ">
        {firstName} {lastName}
      </h1>
      <fieldset className="font-bold">Weight</fieldset>
      <fieldset className="">{weight}</fieldset>
      <fieldset className="font-bold">Height</fieldset>
      <fieldset>{height}</fieldset>
      <fieldset className="font-bold">Hobbies</fieldset>
      <fieldset>{hobbies}</fieldset>
      <fieldset className="font-bold">{"Education"}</fieldset>
      <fieldset>{education}</fieldset>
      <fieldset className="font-bold">{"Job"}</fieldset>
      <fieldset>{job}</fieldset>
      <div className="col-span-2 xl:col-span-4 flex">
        <div className="mx-auto">
          <input
            onClick={() =>
              dispatch?.({
                type: homepageActions.setStep,
                payload: meetingStep.book,
              })
            }
            type={"button"}
            className="bg-green-500 cursor-pointer text-white p-4   "
            value={"Meet " + editableProfiles?.currentProfile.firstName}
          />
        </div>
      </div>
    </div>
  );
};
export default Default;
