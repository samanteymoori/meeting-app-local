"use client";
import { useContext } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  const { weight, height, hobbies, education, job }: any =
    editableProfiles?.currentProfile;
  return (
    <div className="border-4 border-white h-full rounded-lg grid grid-cols-2 gap-4 [&>*]:p-4 [&>*]:flex-auto flex">
      <div>Weight</div>
      <div className="">{weight}</div>
      <div>Height</div>
      <div>{height}</div>
      <div>Hobbies</div>
      <div>{hobbies}</div>
      <div>{"Education"}</div>
      <div>{education}</div>
      <div>{"Job"}</div>
      <div>{job}</div>
    </div>
  );
};
export default Default;
