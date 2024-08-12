"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import UniversalContextMenu from "@/components/UniversalComponents/UniversalContextMenu";
import { useContext, useState } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";
import StepComponent from "./StepComponent";

const Default = () => {
  const [open, setOpen] = useState<Boolean>(false);
  const { editableProfiles } = useContext<HomePageContextType>(HomePageContext);
  return (
    <>
      <div className="flex gap-4 "></div>
      <div className="flex-auto mx-auto">
        <div className=" h-full  flex mx-auto self-center">
          <div className="hidden md:block">
            <StepComponent />
          </div>

          <div className="self-center mx-auto flex-auto"></div>
          {editableProfiles?.authenticatedProfile && (
            <div className="self-center   flex mx-8 p-4 gap-4">
              <div className=" hidden md:block shadow-lg rounded-full flex cursor-pointer bg-white">
                <div className="self-center mx-auto">
                  <RoundedImage
                    onClick={() => {
                      setOpen(true);
                    }}
                    src={editableProfiles.authenticatedProfile.image.src}
                    size={"profile"}
                  />
                  <UniversalContextMenu open={open} setOpen={setOpen} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Default;
