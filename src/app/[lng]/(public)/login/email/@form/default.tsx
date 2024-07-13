import UniversalForm from "@/components/UniversalForm/UniversalForm";
import UniversalTextBox from "@/components/UniversalTextBox/UniversalTextBox";
import React from "react";

const Page = async ({ params: { lng } }: any) => {
  return (
    <UniversalForm action={""} className={""} onSubmit={undefined}>
      <UniversalTextBox label={"Email"} value={""} name={"email"} first />
      <UniversalTextBox label={"Password"} value={""} name={"password"} />
    </UniversalForm>
  );
};

export default Page;
