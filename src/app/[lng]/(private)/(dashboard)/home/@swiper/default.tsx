"use client";
import Image from "next/image";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import RoundedImage from "./RoundedImage";
const Default = () => {
  return (
    <div className="flex">
      <RoundedImage src={"/images/profile.jpg"} size={"medium"} />
      <RoundedImage src={"/images/profile2.jpg"} size={"small"} />
      <RoundedImage src={"/images/profile3.jpg"} size={"small"} />
    </div>
  );
};
export default Default;
