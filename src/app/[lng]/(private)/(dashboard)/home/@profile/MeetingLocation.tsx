import { useContext } from "react";
import { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const MeetingLocation: React.FC = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <>
      {editableProfiles && (
        <>
          {" "}
          <h1 className="self-center mt-8 text-xl">Location:</h1>
          <div className="mt-4 text-lg text-green-500">
            {editableProfiles?.meetingRecord?.name ||
              editableProfiles.currentPlace.name}
          </div>
          <div className="mt-4">
            {editableProfiles?.meetingRecord?.address ||
              editableProfiles.currentPlace.address}
          </div>
          <div className="mt-4">
            {editableProfiles?.meetingRecord?.phone ||
              editableProfiles.currentPlace.phone}
          </div>
        </>
      )}
    </>
  );
};
export default MeetingLocation;
