import Image from "next/image";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaWalking } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
const Layout = async ({ leftMenu, topMenu, swiper }: any) => {
  return (
    <div className="grid grid-cols-6  w-full  h-32 bg-stone-200 rounded-t-lg">
      <div className="col-span-6  flex self-top h-32">{topMenu}</div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="h-full ">{leftMenu}</div>
        <div className="col-span-5 mt-4 h-full self-start">{swiper}</div>
      </div>
    </div>
  );
};

export default Layout;
