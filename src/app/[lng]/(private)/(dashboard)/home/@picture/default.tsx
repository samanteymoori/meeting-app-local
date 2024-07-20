"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { useContext } from "react";
import { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles } = useContext<HomePageContextType>(HomePageContext);
  if (
    editableProfiles?.step !== undefined &&
    editableProfiles.step === meetingStep.book
  ) {
    return null;
  }
  return (
    <div className="h-[25rem] ">
      <RoundedImage
        backdrop={"backdrop"}
        src={editableProfiles?.currentProfile.image.src || ""}
        size={"large"}
      />
    </div>
  );
};
export default Default;
