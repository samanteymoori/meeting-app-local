"use client";
import React from "react";

import { FaChevronCircleLeft } from "react-icons/fa";
import Link from "next/link";

const Layout = async ({ children }: any) => {
  return (
    <form className="grid grid-cols-6 w-screen flex w-full  h-20 bg-neutral-500 ">
      <div className="flex">
        <div className="ml-4 self-center text-white">
          <Link href={"/en/home"}>
            <FaChevronCircleLeft />
          </Link>
        </div>
        <h1 className="col-span-6 self-center m-4 text-xl text-white flex self-center ">
          {"Privacy Policy"}
        </h1>
      </div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="col-span-6   h-full bg-white  grid md:grid-cols-1">
          <div className="grid ">
            <div className="grid grid-cols-1">{children}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Layout;
