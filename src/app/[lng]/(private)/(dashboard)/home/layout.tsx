import Image from "next/image";
import React from "react";

const Layout = async ({ leftMenu, topMenu, swiper }: any) => {
  return (
    <div className="grid grid-cols-6  w-full  h-24 bg-slate-500 rounded-t-lg">
      <div className="col-span-6  grid grid-cols-6 self-top h-24">
        <div className="shadow-xl self-center rounded-lg rounded-l-none flex flex-none  bg-white ">
          <div className="ml-4   self-center">
            <Image
              className="bg-transparent  "
              src={"/images/logo.jpg"}
              alt={"Coffee"}
              width={64}
              height={64}
            />
          </div>
          <div className="self-center uppercase mx-auto">
            <h2 className="text-xl italic my-4">Book & Meet</h2>
          </div>
        </div>
        <div className="col-span-5 grid  ">
          <div className=" h-full flex self-center">
            <div className="self-center mx-auto flex-auto">
              <div className="flex mx-auto">
                <div className="h-16 [&>*]:uppercase [&>*]:self-center [&>*]:h-16 [&>*]:py-4 [&>*]:w-44 [&>*]:text-center rounded-lg [&>*]:mx-auto [&>*]:px-8 ml-8 [&>*]:border  shadow-xl rounded-lg bg-white flex">
                  <div className="rounded-tl-lg rounded-bl-lg">Find</div>
                  <div> Book</div>
                  <div className="rounded-tr-lg rounded-br-lg"> Meet</div>
                </div>
              </div>
            </div>
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
