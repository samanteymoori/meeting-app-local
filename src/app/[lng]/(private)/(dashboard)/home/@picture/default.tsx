"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { useContext } from "react";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const Default = () => {
  const { editableProfiles } = useContext<HomePageContextType>(HomePageContext);
  return (
    <div className="h-[25rem]">
      <RoundedImage
        backdrop={"backdrop"}
        src={editableProfiles?.currentProfile.image.src || ""}
        size={"large"}
      />
    </div>
  );
};
export default Default;
