"use client";
import UniversalButton from "@/components/UniversalComponents/UniversalButton";
import Universalbutton from "@/components/UniversalComponents/UniversalButton";
import UniversalForm from "@/components/UniversalComponents/UniversalForm";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";
import React, { useState } from "react";

const Page = ({ params: { lng } }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = () => {
    debugger;
  };
  return (
    <div className="flex w-screen h-full">
      <UniversalForm
        action={""}
        className={
          "border roundend-xl p-16 border-gray-100  mx-auto m-4 self-center"
        }
        onSubmit={undefined}
      >
        <UniversalTextBox
          className="w-full"
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="mt-4"
          value={"Login"}
          type={"button"}
          onClick={() => login()}
        />
      </UniversalForm>
    </div>
  );
};

export default Page;
