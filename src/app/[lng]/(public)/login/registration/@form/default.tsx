import UniversalForm from "@/components/UniversalComponents/UniversalForm";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";
import React from "react";

const Page = async ({ params: { lng } }: any) => {
  return (
    <UniversalForm action={""} className={""} onSubmit={undefined}>
      <UniversalTextBox
        label={"First name"}
        value={""}
        name={"first_name"}
        first
      />
      <UniversalTextBox label={"Last name"} value={""} name={"lastName"} />
      <UniversalTextBox label={"Email"} value={""} name={"email"} />
      <UniversalTextBox
        label={"Confirm Email"}
        value={""}
        name={"confirm-email"}
      />
      <UniversalTextBox
        label={"Password"}
        type={"password"}
        value={""}
        name={"password"}
      />
      <UniversalTextBox
        type={"password"}
        label={"Confirm Password"}
        value={""}
        name={"confirmPassword"}
      />
    </UniversalForm>
  );
};

export default Page;
