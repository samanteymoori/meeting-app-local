import Image from "next/image";
import React from "react";

const Layout = async ({ leftMenu, topMenu, swiper }: any) => {
  return (
    <div className="grid grid-cols-6 h-[40rem] w-full  bg-yellow-500">
      <div className="col-span-6 bg-green-400 grid grid-cols-6 self-top h-30">
        <div className=" self-center flex-none bg-red-800">
          <Image
            className="bg-transparent mx-auto "
            src={"/images/logo.jpg"}
            alt={"Coffee"}
            width={150}
            height={50}
          />
        </div>
        <div className="col-span-5 bg-yellow-400 ">
          <div className="bg-red-500 h-full self-center">this is menu</div>
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="h-full bg-purple-100">{leftMenu}</div>
        <div className="col-span-5 mt-4 h-full self-start">{swiper}</div>
      </div>
    </div>
  );
};

export default Layout;
