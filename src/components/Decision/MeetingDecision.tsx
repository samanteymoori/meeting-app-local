import { getMeetingService } from "@/services/meetingService";
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
          const meetingService = getMeetingService();
          await meetingService.actionMeetingParticipant({
            meeting_id,
            meeting_participant_id,
            action: "decline",
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
