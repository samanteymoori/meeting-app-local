"use client";
import Map from "@/components/Map/Map";
import OpenMap from "@/components/Map/OpenMap";
import { useContext } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  return (
    <div className="col-span-6 p-2 h-full  gap-2 h-full bg-white  grid grid-cols-1">
      <div className="p-2 bg-white rounded-lg">
        <OpenMap />
      </div>
    </div>
  );
};
export default Default;
