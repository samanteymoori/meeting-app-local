import Image from "next/image";
import React from "react";

const Layout = async ({ leftMenu, topMenu, swiper }: any) => {
  return (
    <div className="grid grid-cols-6 h-[40rem] w-full  ">
      <div className="col-span-6  grid grid-cols-6 self-top h-30">
        <div className=" self-center flex-none ">
          <Image
            className="bg-transparent mx-auto "
            src={"/images/logo.jpg"}
            alt={"Coffee"}
            width={150}
            height={50}
          />
        </div>
        <div className="col-span-5 grid  ">
          <div className=" h-full flex self-center">
            <div className="self-center  flex-auto"></div>
            <div className="self-center   flex mx-8 p-4 gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100"></div>
              <div className="h-12 w-12 rounded-full bg-green-100"></div>
              <div className="h-12 w-12 rounded-full bg-green-100"></div>
              <div className="h-12 w-12 rounded-full bg-green-100"></div>
              <div className="h-12 w-12 rounded-full bg-green-100"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="h-full ">{leftMenu}</div>
        <div className="col-span-5 mt-4 h-full self-start">{swiper}</div>
      </div>
    </div>
  );
};

export default Layout;
