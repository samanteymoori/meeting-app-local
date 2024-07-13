import React from "react";

const Layout = async ({ topMenu, swiper, map, profile, picture }: any) => {
  return (
    <div className="grid grid-cols-6  w-full  h-14 bg-neutral-500 rounded-t-lg">
      <div className="col-span-6  flex self-top h-14">{topMenu}</div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="col-span-6 bg-gray-200  h-full self-start">
          {swiper}
        </div>
        <div className="col-span-6 p-2  gap-2 h-full bg-red-100  grid grid-cols-2">
          <div className="grid">
            <div>{picture}</div>
            <div>{map}</div>
          </div>
          <div>{profile}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
