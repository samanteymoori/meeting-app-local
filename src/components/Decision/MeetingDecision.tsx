import homepageActions from "@/app/[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import { getMeetingService } from "@/services/meetingService";
import { useContext } from "react";
import UniversalButton from "../UniversalComponents/UniversalButton";
type Props = {
  meeting_id: string;
  meeting_participant_id: string;
  status: string;
  update: () => void;
};
const MeetingDecision: React.FC<Props> = ({
  meeting_id,
  meeting_participant_id,
  update,
  status,
}: Props) => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  return (
    <div className="flex gap-4">
      <UniversalButton
        className={`bg-green-400 ${status !== "accept" && "opacity-50"}`}
        onClick={async () => {
          const meetingService = getMeetingService();
          await meetingService.actionMeetingParticipant({
            meeting_id,
            meeting_participant_id,
            action: "accept",
          });
          update?.();
        }}
        value={"Accept"}
        type={"button"}
        loading={false}
      />
      <UniversalButton
        className={` ${status !== "decline" && "opacity-50"} bg-red-400`}
        value={"Decline"}
        onClick={async () => {
          if (!confirm("Are you sure?")) return;
          const meetingService = getMeetingService();
          await meetingService.actionMeetingParticipant({
            meeting_id,
            meeting_participant_id,
            action: "decline",
          });

          await meetingService.actionMeeting({
            meeting_id,
            action: "cancel",
          });
          dispatch?.({
            type: homepageActions.cancelMeeting,
            payload: editableProfiles?.authenticatedProfile.id,
          });
          update?.();
        }}
        type={"button"}
        loading={false}
      />
      <UniversalButton
        className={` ${status !== "maybe" && "opacity-50"}  bg-yellow-400`}
        value={"Maybe"}
        onClick={async () => {
          const meetingService = getMeetingService();
          await meetingService.actionMeetingParticipant({
            meeting_id,
            meeting_participant_id,
            action: "maybe",
          });
          update?.();
        }}
        type={"button"}
        loading={false}
      />
    </div>
  );
};
export default MeetingDecision;
