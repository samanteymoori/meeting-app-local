"use client";
import UniversalDatePicker from "@/components/UniversalComponents/UniversalDatePicker";
import { LatLng } from "leaflet";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";
import PersonProfile from "./PersonProfile";
import PlaceProfile from "./PlaceProfile";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  const router = useRouter();
  if (editableProfiles && editableProfiles.step === meetingStep.find) {
    return <PersonProfile showButton={true} />;
  }
  if (editableProfiles && editableProfiles.step === meetingStep.meet) {
    const ep = editableProfiles as any;
    return (
      <div className="flex h-full p-8">
        {JSON.stringify({
          person_to_meet_id: ep?.personToMeet?.id,
          owner_person_id: ep.authenticatedProfile?.id,
          place_id: ep.currentPlace?.id,
        })}

        <div className="self-center">
          <h1 className="self-center text-xl">Meet At:</h1>
          <div className="self-center mt-4">
            <UniversalDatePicker />
          </div>
          <h1 className="self-center mt-8 text-xl">Location:</h1>
          <div className="mt-4 text-lg text-green-500">
            {editableProfiles.currentPlace.name}
          </div>
          <div className="mt-4">{editableProfiles.currentPlace.address}</div>
          <div className="mt-4">{editableProfiles.currentPlace.phone}</div>
          <div className="flex mt-8">
            <input
              onClick={() => {
                router.push("/en/meetings/123");
              }}
              type={"button"}
              className="bg-green-500 px-8 mx-auto cursor-pointer  text-white p-4"
              value={"Send"}
            />
          </div>
        </div>
      </div>
    );
  }

  return <PlaceProfile showButton={true} />;
};
export default Default;
