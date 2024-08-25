"use client";
import React from "react";

import { getAuthService } from "@/services/authService";
import { getUserService } from "@/services/userService";
import { ProfileType } from "@/types/ProfileType";
import { useEffect, useState } from "react";
import { Puff } from "react-loading-icons";
import UniversalButton from "@/components/UniversalComponents/UniversalButton";
import { FaChevronCircleLeft } from "react-icons/fa";
import Link from "next/link";

const Layout = async ({ children, form }: any) => {
  return (
    <form className="grid grid-cols-6 w-screen flex w-full  h-20 bg-neutral-500 ">
      <div className="flex">
        <div className="ml-4 self-center text-white">
          <Link href={"/en/home"}>
            <FaChevronCircleLeft />
          </Link>
        </div>
        <h1 className="col-span-6 self-center m-4 text-xl text-white flex self-center ">
          {"Registration"}
        </h1>
      </div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="col-span-6 p-2  gap-2 h-full bg-white  grid md:grid-cols-2">
          <div className="grid ">
            <h1 className="text-2xl m-4">{"Please complete form below:"}</h1>
            <div className="grid gap-4 m-4 grid-cols-2">{form}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Layout;
