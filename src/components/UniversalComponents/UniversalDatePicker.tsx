import homepageActions from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const UniversalDatePicker: React.FC = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <div className="border flex border-gray-500  w-full px-8 border-4 rounded-lg text-xl h1 text-bold">
      <DatePicker
        className={" h-[4rem] outline-none"}
        selected={(editableProfiles?.meetingDate as any) || null}
        onChange={(date: any) =>
          dispatch?.({
            type: homepageActions.setMeetingDate,
            payload: date,
          })
        }
      />
      <div className="border-l border-2 border-gray-500"></div>
      <input
        aria-label="Time"
        onChange={(e: any) => {
          dispatch?.({
            type: homepageActions.setMeetingTime,
            payload: e.target.value,
          });
        }}
        className="self-center pl-8 mx-auto outline-none"
        type="time"
      />
    </div>
  );
};
export default UniversalDatePicker;
