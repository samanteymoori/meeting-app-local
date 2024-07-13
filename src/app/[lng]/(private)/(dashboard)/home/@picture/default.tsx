import RoundedImage from "@/components/Profile/RoundedImage";
import { profileList } from "@/mocks/profile-list";

const Default = () => {
  return (
    <div>
      <RoundedImage src={profileList[0]?.src} size={"large"} />
    </div>
  );
};
export default Default;
