"use client";
import { useContext } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  const { firstName, lastName, weight, height, hobbies, education, job }: any =
    editableProfiles?.currentProfile;
  return (
    <div className="border-4 shadow border border-gray-100 h-full  rounded-lg grid grid-cols-2 gap-x-4 gap-y-2 [&>*]:p-4 [&>*]:flex-auto flex">
      <h1 className="col-span-2 text-2xl text-green-500 ">
        {firstName} {lastName}
      </h1>
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
