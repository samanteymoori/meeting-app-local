"use client";
import UniversalButton from "@/components/UniversalComponents/UniversalButton";
import Universalbutton from "@/components/UniversalComponents/UniversalButton";
import UniversalForm from "@/components/UniversalComponents/UniversalForm";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";
import { createNavigationLink, navigation_items } from "@/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = ({ params: { lng } }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const route = createNavigationLink(
          navigation_items.private.home,
          new URL(window.location.href)
        );

        router.push(route);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-screen h-full">
      <UniversalForm
        onSubmit={handleSubmit}
        action={""}
        className={
          "border roundend-xl p-16 border-gray-100  mx-auto m-4 self-center"
        }
      >
        <UniversalTextBox
          className="w-full"
          label={"Email"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name={"email"}
          first
        />
        <UniversalTextBox
          className="w-full"
          label={"Password"}
          value={password}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          name={"password"}
        />
        <UniversalButton
          loading={loading}
          className="mt-4"
          value={"Login"}
          type={"submit"}
        />
      </UniversalForm>
    </div>
  );
};

export default Page;
