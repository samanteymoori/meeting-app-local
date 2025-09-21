import { useContext } from "react";
import { FaCheckCircle, FaRegQuestionCircle } from "react-icons/fa";
import { ImCancelCircle, ImQuestion } from "react-icons/im";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const StatusCheck: React.FC = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <>
      {editableProfiles && (
        <>
          {(!editableProfiles.meetingRecord?.meeting_participant_status ||
            editableProfiles.meetingRecord?.meeting_participant_status ===
              "pending") && (
            <div className="self-center mr-auto ml-2">
              <FaRegQuestionCircle />
            </div>
          )}
          {editableProfiles.meetingRecord?.meeting_participant_status ===
            "accept" && (
            <div className="self-center text-green-500 ml-2 mr-auto">
              <FaCheckCircle />
            </div>
          )}
          {editableProfiles.meetingRecord?.meeting_participant_status ===
            "reject" && (
            <div className="self-center text-red-500 ml-2 mr-auto">
              <ImCancelCircle />
            </div>
          )}
          {editableProfiles.meetingRecord?.meeting_participant_status ===
            "maybe" && (
            <div className="flex text-yellow-500">
              <div className="self-center text-yellow-500 ml-2 mr-auto">
                <ImQuestion />
              </div>
              <div className="self-center ml-2">{"(maybe)"}</div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default StatusCheck;
