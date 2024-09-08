import UniversalButton from "../UniversalComponents/UniversalButton";

const MeetingDecision: React.FC = () => {
  return (
    <div className="flex gap-4">
      <UniversalButton
        className="bg-green-400"
        value={"Accept"}
        type={"button"}
        loading={false}
      />
      <UniversalButton
        className="bg-red-400"
        value={"Decline"}
        type={"button"}
        loading={false}
      />
      <UniversalButton
        className="bg-yellow-400"
        value={"Maybe"}
        type={"button"}
        loading={false}
      />
    </div>
  );
};
export default MeetingDecision;
