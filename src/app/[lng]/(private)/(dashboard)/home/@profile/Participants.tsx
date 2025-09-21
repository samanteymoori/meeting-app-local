import { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";
import StatusCheck from "./StatusCheck";

const Participants = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <>
      <h2 className="self-center mt-4 text-green-400 text-xl">Participants:</h2>
      {editableProfiles && (
        <div className="mt-4">
          <ul>
            {
              <li className="flex">
                <div className="self-center">
                  <>
                    {editableProfiles.meetingRecord ? (
                      <>
                        {editableProfiles.authenticatedProfile.id ===
                        editableProfiles.meetingRecord?.creator_user_id ? (
                          <>
                            {" "}
                            {editableProfiles.meetingRecord?.first_name}{" "}
                            {editableProfiles.meetingRecord?.last_name}
                          </>
                        ) : (
                          <>
                            {" "}
                            {
                              editableProfiles.meetingRecord?.owner_first_name
                            }{" "}
                            {editableProfiles.meetingRecord?.owner_last_name}
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
                {editableProfiles.meetingRecord.owner_user_id !==
                editableProfiles.authenticatedProfile.id ? (
                  <div className="self-center text-green-500 ml-2 mr-auto">
                    <FaCheckCircle />
                  </div>
                ) : (
                  <>
                    {editableProfiles.meetingRecord ? <StatusCheck /> : <></>}
                  </>
                )}
              </li>
            }
          </ul>
        </div>
      )}
    </>
  );
};
export default Participants;
