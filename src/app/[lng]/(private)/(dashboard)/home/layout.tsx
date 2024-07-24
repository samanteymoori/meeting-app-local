import { profileList } from "@/mocks/profile-list";
import React, { useContext } from "react";
import { meetingStep } from "./contexts/homepageActions";
import { HomePageContext } from "./contexts/HomePageContext";
import { HomePageContextType } from "./contexts/HomePageContextType";
import HomePageContextWrapper from "./contexts/HomePageContextWrapper";

const Layout = async ({ topMenu, swiper, map, profile, picture }: any) => {
  return (
    <HomePageContextWrapper>
      <div className="grid grid-cols-6  w-full  h-20 bg-neutral-500 rounded-t-lg">
        <div className="col-span-6  flex self-top h-20">{topMenu}</div>
        <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
          {swiper}

          <div className="col-span-6 p-2  gap-2 h-full bg-white  grid md:grid-cols-2">
            <div className="grid ">
              <div className="">{picture}</div>
            </div>
            <div>{profile}</div>
          </div>
          {map}
        </div>
      </div>
    </HomePageContextWrapper>
  );
};

export default Layout;
