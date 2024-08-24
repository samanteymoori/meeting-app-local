"use client";
import UniversalDatePicker from "@/components/UniversalComponents/UniversalDatePicker";
import { getMeetingService } from "@/services/meetingService";
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
  if (
    editableProfiles &&
    (editableProfiles.step === meetingStep.meet ||
      editableProfiles.step === meetingStep.detail)
  ) {
    const ep = editableProfiles as any;
    const submitMeeting = async () => {
      const meetingService = getMeetingService();
      if (!ep.meetingTime || !ep.meetingDate) return;
      const meeting = {
        person_to_meet_id: ep?.personToMeet?.id,
        owner_person_id: ep.authenticatedProfile?.id,
        place_id: ep.currentPlace?.id,
        meeting_date: ep.meetingDate,
        meeting_time: ep.meetingTime,
      };
      const {
        response: {
          inserted: { id },
        },
      } = await meetingService.submitMeeting(meeting);
      dispatch?.({
        type: homepageActions.setMeetingRecord,
        payload: { ...meeting, id },
      });
      dispatch?.({
        type: homepageActions.setStep,
        payload: meetingStep.detail,
      });
    };
    return (
      <>
        <div></div>
        <div className="flex h-full p-8">
          <div className="self-center">
            {editableProfiles.step === meetingStep.meet && (
              <div className="self-center mt-4">
                <h1 className="self-center text-xl">Meet At:</h1>

                <UniversalDatePicker />
              </div>
            )}
            {editableProfiles.step === meetingStep.detail && (
              <div className="self-center mt-4">
                <h1 className="self-center text-green-400 text-xl">
                  Meeting is set:
                </h1>
                <h1 className="font-bold mt-4">
                  {editableProfiles.meetingRecord.id}
                </h1>
                <h1 className="font-bold text-green-400 mt-4">
                  {editableProfiles.meetingRecord.meeting_date
                    .toString()
                    .substring(0, 10) +
                    " " +
                    editableProfiles.meetingRecord.meeting_time}
                </h1>
              </div>
            )}
            <h1 className="self-center mt-8 text-xl">Location:</h1>
            <div className="mt-4 text-lg text-green-500">
              {editableProfiles.currentPlace.name}
            </div>
            <div className="mt-4">{editableProfiles.currentPlace.address}</div>
            <div className="mt-4">{editableProfiles.currentPlace.phone}</div>
            {editableProfiles.step === meetingStep.meet && (
              <div className="flex mt-8">
                <input
                  onClick={() => {
                    submitMeeting();
                  }}
                  type={"button"}
                  className="bg-green-500 px-8 mx-auto cursor-pointer  text-white p-4"
                  value={"Send"}
                />
              </div>
            )}
            {editableProfiles.step === meetingStep.detail && (
              <div className="col-span-2 mt-8 xl:col-span-4 flex">
                <div className="mx-auto">
                  <input
                    onClick={() => {
                      dispatch?.({
                        type: homepageActions.cancelMeeting,
                        payload: editableProfiles.authenticatedProfile.id,
                      });
                    }}
                    type={"button"}
                    className="bg-red-500 cursor-pointer text-white p-4   "
                    value={"Cancel "}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return <PlaceProfile showButton={true} />;
};
export default Default;
