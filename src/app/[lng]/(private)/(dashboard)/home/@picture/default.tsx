"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { useContext } from "react";
import { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles } = useContext<HomePageContextType>(HomePageContext);

  if (editableProfiles && editableProfiles?.step === meetingStep.find) {
    return (
      <div className="h-[25rem] ">
        <RoundedImage
          backdrop={"backdrop"}
          src={editableProfiles?.currentProfile?.image?.src || ""}
          size={"large"}
        />
      </div>
    );
  }
  if (editableProfiles && editableProfiles?.step === meetingStep.book) {
    return (
      <div className="h-[25rem] ">
        <RoundedImage
          backdrop={"backdrop"}
          src={editableProfiles?.currentPlace?.image?.src || ""}
          size={"large"}
        />
      </div>
    );
  }
  if (
    editableProfiles &&
    editableProfiles?.step &&
    (editableProfiles?.step === meetingStep.meet ||
      editableProfiles?.step === meetingStep.detail)
  ) {
    return (
      <div className="md:h-[25rem]  cols-span-2">
        <div className="my-4 flex  md:hidden w-full">
          <RoundedImage
            src={
              (editableProfiles.authenticatedProfile.id ===
              editableProfiles.meetingRecord?.creator_user_id
                ? editableProfiles.meetingRecord?.url
                : editableProfiles.meetingRecord?.owner_url) ||
              editableProfiles?.currentProfile?.image?.src ||
              ""
            }
            size={"medium"}
          />
          <RoundedImage
            src={
              editableProfiles.meetingRecord?.place_url ||
              editableProfiles?.currentPlace?.image?.src ||
              ""
            }
            size={"medium"}
          />
        </div>
        <div className=" hidden md:grid grid-cols-2 w-full">
          <RoundedImage
            src={
              (editableProfiles.authenticatedProfile.id ===
              editableProfiles.meetingRecord?.creator_user_id
                ? editableProfiles.meetingRecord?.url
                : editableProfiles.meetingRecord?.owner_url) ||
              editableProfiles?.currentProfile?.image?.src ||
              ""
            }
            size={"large-rounded"}
          />
          <RoundedImage
            src={
              editableProfiles.meetingRecord?.place_url ||
              editableProfiles?.currentPlace?.image?.src ||
              ""
            }
            size={"large-rounded"}
          />
        </div>
      </div>
    );
  }
};
export default Default;
