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
import { ImCancelCircle } from "react-icons/im";
import { getAuthService } from "@/services/authService";
import useMeetings from "@/app/hooks/useMeetings";
import MeetingDecision from "@/components/Decision/MeetingDecision";

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
        <div className="flex h-full p-0 md:p-8">
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
                <h2 className="self-center mt-4 text-green-400 text-xl">
                  Participants:
                </h2>
                <div className="mt-4">
                  <ul>
                    {
                      <li className="flex">
                        <div className="self-center">
                          <>
                            {editableProfiles.meetingRecord ? (
                              <>
                                {editableProfiles.authenticatedProfile.id ===
                                editableProfiles.meetingRecord
                                  ?.creator_user_id ? (
                                  <>
                                    {" "}
                                    {
                                      editableProfiles.meetingRecord?.first_name
                                    }{" "}
                                    {editableProfiles.meetingRecord?.last_name}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    {
                                      editableProfiles.meetingRecord
                                        ?.owner_first_name
                                    }{" "}
                                    {
                                      editableProfiles.meetingRecord
                                        ?.owner_last_name
                                    }
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {editableProfiles?.currentProfile?.first_name}{" "}
                                {editableProfiles?.currentProfile?.last_name}
                              </>
                            )}
                          </>
                        </div>
                        {(!editableProfiles.currentProfile?.status ||
                          editableProfiles.currentProfile?.status ===
                            "pending") && (
                          <div className="self-center mr-auto ml-2">
                            <FaRegQuestionCircle />
                          </div>
                        )}
                        {editableProfiles.currentProfile?.status ===
                          "accepted" && (
                          <div className="self-center text-green-500 ml-2 mr-auto">
                            <FaCheckCircle />
                          </div>
                        )}
                        {editableProfiles.currentProfile?.status ===
                          "rejected" && (
                          <div className="self-center text-red-500 ml-2 mr-auto">
                            <ImCancelCircle />
                          </div>
                        )}
                      </li>
                    }
                  </ul>
                </div>
                <h1 className="font-bold text-green-400 mt-4">
                  {editableProfiles?.meetingRecord?.meeting_date &&
                    moment(editableProfiles.meetingRecord.meeting_date).format(
                      "yyyy-MM-DD hh:mm A"
                    )}
                </h1>
              </div>
            )}
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

  return <PlaceProfile showButton={true} />;
};
export default Default;
