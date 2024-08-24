"use client";
import UniversalButton from "@/components/UniversalComponents/UniversalButton";
import UniversalForm from "@/components/UniversalComponents/UniversalForm";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";
import { createNavigationLink, navigation_items } from "@/navigation";
import { getAuthService } from "@/services/authService";
import { ProfileType } from "@/types/ProfileType";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Puff } from "react-loading-icons";

const Page = ({ params: { lng } }: any) => {
  const router = useRouter();
  const [img, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any | null>({
    first_name: "",
    last_name: "",
    email: "",
    confirm_password: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      setLoading(true);
      if (!profile) return;
      const authService = getAuthService(window.location.href);
      const response: any = await authService.registerUser(profile);

      try {
        if (response.statusCode === 200) {
          const route = createNavigationLink(
            navigation_items.auth.login,
            new URL(window.location.href)
          );
          router.push(route);
        } else {
          const responseMessage = await response.json();
          alert("error");
        }
      } finally {
        setLoading(false);
      }
      alert("Your profile is created.");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <UniversalTextBox
        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
        label={"First name"}
        value={profile.first_name}
        name={"first_name"}
        first
      />
      <UniversalTextBox
        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
        label={"Last name"}
        value={profile.last_name}
        name={"lastName"}
      />
      <UniversalTextBox
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        label={"Email"}
        value={profile.email}
        name={"email"}
      />
      <UniversalTextBox
        onChange={(e) =>
          setProfile({ ...profile, confirm_email: e.target.value })
        }
        label={"Confirm Email"}
        value={profile.confirm_email}
        name={"confirm-email"}
      />
      <UniversalTextBox
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        label={"Password"}
        type={"password"}
        value={profile.password}
        name={"password"}
      />
      <UniversalTextBox
        onChange={(e) =>
          setProfile({ ...profile, confirm_password: e.target.value })
        }
        type={"password"}
        label={"Confirm Password"}
        value={profile.confirm_password}
        name={"confirmPassword"}
      />
      <div>
        {loading ? (
          <Puff stroke="#98ff98" />
        ) : (
          <UniversalButton
            onClick={(e) => {
              e.preventDefault();

              registerUser();
            }}
            value={"Register"}
            type={"button"}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
