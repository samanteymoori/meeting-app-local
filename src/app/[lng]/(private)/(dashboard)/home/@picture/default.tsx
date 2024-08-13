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
          src={editableProfiles?.currentPlace.image.src || ""}
          size={"large"}
        />
      </div>
    );
  }
  if (
    editableProfiles &&
    editableProfiles?.step &&
    editableProfiles?.step === meetingStep.meet
  ) {
    return (
      <div className="h-[25rem]  cols-span-2">
        <div className="grid grid-cols-2 w-full">
          <RoundedImage
            backdrop={"backdrop"}
            src={editableProfiles?.currentProfile.image.src || ""}
            size={"large-rounded"}
          />
          <RoundedImage
            backdrop={"backdrop"}
            src={editableProfiles?.currentPlace.image.src || ""}
            size={"large-rounded"}
          />
        </div>
      </div>
    );
  }
};
export default Default;
