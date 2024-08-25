"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import UniversalButton from "@/components/UniversalComponents/UniversalButton";
import UniversalFileUpload from "@/components/UniversalComponents/UniversalFileUpload";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";
import { getAuthService } from "@/services/authService";
import { getUserService } from "@/services/userService";
import { ProfileType } from "@/types/ProfileType";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Bars, Puff } from "react-loading-icons";

export default function Page() {
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
    <form className="grid grid-cols-6 flex w-full  h-20 bg-neutral-500 ">
      <div className="flex h-20">
        <div className="self-center text-white ml-4 cursor-pointer">
          <Link href={"/"}>
            <FaChevronCircleLeft />
          </Link>
        </div>

        <h1 className="col-span-6 self-center m-4 text-xl text-white flex ">
          {"My Profile"}
        </h1>
      </div>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="col-span-6 p-2  gap-2 h-full bg-white  grid md:grid-cols-2">
          <div className="grid ">
            <h1 className="text-2xl m-4">{"Change Profile Detail"}</h1>
            <div className="grid gap-4 m-4 grid-cols-2">
              <div>
                <UniversalTextBox
                  label={"First name"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      first_name: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.first_name || ""}
                  name={"first_name"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Last name"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      last_name: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.last_name || ""}
                  name={"last_name"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Weight"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      weight: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.weight || ""}
                  name={"weight"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Height"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      height: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.height || ""}
                  name={"height"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Hobbies"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      hobbies: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.hobbies || ""}
                  name={"hobbies"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Education"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      education: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.education || ""}
                  name={"education"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Job"}
                  onChange={(e: any) =>
                    setAuthenticatedUser({
                      ...(authenticatedUser as any),
                      job: e.target.value || "",
                    })
                  }
                  value={authenticatedUser?.job || ""}
                  name={"job"}
                />
              </div>
              <div>
                <UniversalFileUpload
                  isFile={false}
                  data={[]}
                  label={"Upload Image"}
                  setIsLoading={() => {}}
                  required={false}
                  isMultiple={false}
                  disabled={false}
                  isMultiline={false}
                  withoutMainImage={false}
                  setCancel={() => {}}
                  fileUploaded={async (result: any) => {
                    const res = await result.json();
                    setImage(res.file);
                  }}
                />
              </div>
              <div>
                {loading ? (
                  <Puff stroke="#98ff98" />
                ) : (
                  <UniversalButton
                    onClick={() => saveProfileDetail()}
                    value={"Save"}
                    type={"button"}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
          <div>{img && <RoundedImage src={img} size={"large"} />}</div>
        </div>
      </div>
    </form>
  );
}
