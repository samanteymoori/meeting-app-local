"use client";
import React from "react";

import { getAuthService } from "@/services/authService";
import { getUserService } from "@/services/userService";
import { ProfileType } from "@/types/ProfileType";
import { useEffect, useState } from "react";
import { Bars, Puff } from "react-loading-icons";

const Layout = async ({ children, form }: any) => {
  const [img, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const saveProfileDetail = async () => {
    try {
      setLoading(true);
      if (!authenticatedUser) return;
      const UserService = getUserService(window.location.href);
      await UserService.updateUserDetail(authenticatedUser);
      getImage();
      alert("Your profile is updated.");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const [authenticatedUser, setAuthenticatedUser] =
    useState<ProfileType | null>();
  const getImage = async () => {
    const authService = getAuthService();
    const authenticatedUser = await authService.getAuthenticatedUser();
    setAuthenticatedUser(authenticatedUser.item);
    const uri = `/api/user_profiles/${authenticatedUser?.item?.id}/picture`;
    fetch(uri, {
      method: "GET",
    }).then(async (result) => {
      const res = await result.json();
      setImage(res.url);
    });
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <form className="grid grid-cols-6 w-screen flex w-full  h-20 bg-neutral-500 ">
      <h1 className="col-span-6 m-4 text-xl text-white flex self-top h-20">
        {"Registration"}
      </h1>
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
