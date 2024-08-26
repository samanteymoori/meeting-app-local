"use client";
import UniversalButton from "@/components/UniversalComponents/UniversalButton";
import Universalbutton from "@/components/UniversalComponents/UniversalButton";
import UniversalForm from "@/components/UniversalComponents/UniversalForm";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";
import { createNavigationLink, navigation_items } from "@/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = ({ params: { lng } }: any) => {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/user/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.status === 200) {
        const route = createNavigationLink(
          navigation_items.private.home,
          new URL(window.location.href)
        );
        router.push(route);
      } else {
        const responseMessage = await response.json();
        setError(responseMessage.error);
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
          "border roundend-xl w-full h-full p-16 border-gray-100  mx-auto m-4 self-center"
        }
      >
        <div className="self-center mx-8 grid">
          <UniversalTextBox
            className="w-full"
            label={"Email"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name={"email"}
            first
          />

          <UniversalButton
            loading={loading}
            className="mt-4 mx-auto px-8"
            value={"Login"}
            type={"submit"}
          />
          {error && <h1>{error}</h1>}
          <div className="grid grid-cols-2 mt-8">
            <div>
              <Link
                className="text-blue-500 underline"
                href={"/en/login/registration"}
              >
                Login
              </Link>
            </div>
            <div className="flex">
              <Link
                className="text-blue-500 ml-auto underline"
                href={"/en/login/registration"}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </UniversalForm>
    </div>
  );
};

export default Page;
