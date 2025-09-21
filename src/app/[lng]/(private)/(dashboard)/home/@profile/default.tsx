"use client";
import UniversalDatePicker from "@/components/UniversalComponents/UniversalDatePicker";
import { getMeetingService, MeetingService } from "@/services/meetingService";
import { LatLng } from "leaflet";
import moment from "moment";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaCheckCircle, FaRegQuestionCircle } from "react-icons/fa";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";
import PersonProfile from "./PersonProfile";
import PlaceProfile from "./PlaceProfile";
import { ImCancelCircle, ImBlocked, ImQuestion } from "react-icons/im";
import { getAuthService } from "@/services/authService";
import useMeetings from "@/app/hooks/useMeetings";
import MeetingDecision from "@/components/Decision/MeetingDecision";
import Picture from "./Picture";
import StatusCheck from "./StatusCheck";
import Participants from "./Participants";
import MeetingLocation from "./MeetingLocation";

const Default = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  useMeetings();
  const router = useRouter();
  const updateStatus = () => {
    dispatch?.({
      type: homepageActions.updateStatus,
      payload: new Date().getTime(),
    });
  };
  if (editableProfiles && editableProfiles.step === meetingStep.find) {
    return (
      <>
        {editableProfiles?.showModal === true &&
          editableProfiles.currentProfile && (
            <div className="col-span-6 p-0 md:max-w-[65w] z-[1000] fixed  top-[0px] md:top-[30%] md:rounded-lg md:border md:left-[12.5vw] md:max-w-[75vw] md-mx-auto md:border md:border-2 h-screen md:h-[500px] !w-screen mx-auto gap-2 h-full bg-white  grid md:grid-cols-1 overflow-x-hidden">
              <div className="grid md:grid-cols-2 md:rounded-lg">
                <div className="md:self-center">
                  <Picture />
                </div>
                <div className="flex">
                  <div className="">{<PersonProfile showButton={true} />}</div>
                  <div
                    onClick={() =>
                      dispatch?.({
                        type: homepageActions.showModal,
                        payload: !editableProfiles.showModal,
                      })
                    }
                    className="md:absolute md:text-black md:top-0 md:text-white md:z-[1001] right-0 ml-auto m-4 cursor-pointer"
                  >
                    X
                  </div>
                </div>
              </div>
            </div>
          )}
      </>
    );
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

      const place_id = editableProfiles.currentPlace.id;

      const meeting = {
        person_to_meet_id: ep?.personToMeet?.id,
        owner_person_id: ep.authenticatedProfile?.id,
        place_id,
        meeting_date: ep.meetingDate,
        meeting_time: ep.meetingTime,
      };
      console.log({ meeting });
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
        <div className="flex col-span-6 mx-auto h-full p-0 md:p-8">
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
                  {editableProfiles.meetingRecord.meeting_id}
                </h1>

                <Participants />
                <h1 className="font-bold text-green-400 mt-4">
                  {editableProfiles?.meetingRecord?.meeting_date &&
                    moment(editableProfiles.meetingRecord.meeting_date).format(
                      "yyyy-MM-DD hh:mm A"
                    )}
                </h1>
              </div>
            )}
            <MeetingLocation />
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
                  {editableProfiles.meetingRecord.creator_user_id ===
                  editableProfiles.authenticatedProfile.id ? (
                    <input
                      onClick={async () => {
                        const meetingService = getMeetingService(
                          window.location.href
                        );

                        await meetingService.actionMeeting({
                          meeting_id: editableProfiles.meetingRecord.meeting_id,
                          action: "cancel",
                        });
                        dispatch?.({
                          type: homepageActions.cancelMeeting,
                          payload: editableProfiles.authenticatedProfile.id,
                        });
                      }}
                      type={"button"}
                      className="bg-red-500 cursor-pointer text-white p-4   "
                      value={"Cancel"}
                    />
                  ) : (
                    <MeetingDecision
                      meeting_id={editableProfiles.meetingRecord.meeting_id}
                      meeting_participant_id={
                        editableProfiles.meetingRecord.meeting_participant_id
                      }
                      status={
                        editableProfiles.meetingRecord
                          .meeting_participant_status
                      }
                      update={updateStatus}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {editableProfiles?.showModal === true &&
        editableProfiles.currentPlace && (
          <div className="col-span-6 p-0 md:max-w-[65w] z-[1000] fixed  top-[0px] md:top-[30%] md:rounded-lg md:border md:left-[25vw] md:max-w-[50vw] md-mx-auto md:border md:border-2 h-screen md:h-[500px] !w-screen mx-auto gap-2 h-full bg-white  grid md:grid-cols-1 overflow-x-hidden">
            <div className="grid md:grid-cols-2 md:rounded-lg">
              <div className="md:self-center">
                <Picture />
              </div>
              <div className="flex">
                <div className="">{<PlaceProfile showButton={true} />}</div>
                <div
                  onClick={() =>
                    dispatch?.({
                      type: homepageActions.showModal,
                      payload: !editableProfiles.showModal,
                    })
                  }
                  className="md:absolute md:text-black md:top-0 md:text-white md:z-[1001] right-0 ml-auto m-4 cursor-pointer"
                >
                  X
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
export default Default;
