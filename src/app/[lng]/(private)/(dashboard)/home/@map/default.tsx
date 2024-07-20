"use client";
import Map from "@/components/Map/Map";
import OpenMap from "@/components/Map/OpenMap";
import { useContext } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  return (
    <div className="p-2 bg-white rounded-lg">
      <OpenMap />
    </div>
  );
};
export default Default;
