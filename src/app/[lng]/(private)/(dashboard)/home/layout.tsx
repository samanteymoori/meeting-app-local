import { profileList } from "@/mocks/profile-list";
import React from "react";
import { HomePageContext } from "./contexts/HomePageContext";
import HomePageContextWrapper from "./contexts/HomePageContextWrapper";

const Layout = async ({ topMenu, swiper, map, profile, picture }: any) => {
  return (
    <HomePageContextWrapper>
      <div className="grid grid-cols-6  w-full  h-14 bg-neutral-500 rounded-t-lg">
        <div className="col-span-6  flex self-top h-14">{topMenu}</div>
        <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
          <div className="col-span-6 bg-gray-200  h-full self-start p-2">
            {swiper}
          </div>
          <div className="col-span-6 p-2  gap-2 h-full bg-white  grid grid-cols-2">
            <div className="grid ">
              <div className="">{picture}</div>
            </div>
            <div>{profile}</div>
          </div>
          <div className="col-span-6 p-2 h-full  gap-2 h-full bg-white  grid grid-cols-1">
            {map}
          </div>
        </div>
      </div>
    </HomePageContextWrapper>
  );
};

export default Layout;
