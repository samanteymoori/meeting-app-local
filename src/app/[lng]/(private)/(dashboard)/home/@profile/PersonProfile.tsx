import { useContext } from "react";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

type Props = {
  showButton: boolean;
};
const PersonProfile: React.FC<Props> = ({ showButton }) => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  if (!editableProfiles?.currentProfile) return null;

  const {
    first_name,
    last_name,
    weight,
    height,
    hobbies,
    education,
    job,
  }: any = editableProfiles?.currentProfile;
  return (
    <>
      <div className="  h-full  rounded-lg grid gap-x-4 gap-y-2 [&>*]:p-4 [&>*]:flex-auto flex">
        <h1 className="col-span-2 capitalize xl:col-span-4 text-2xl text-green-500 ">
          {first_name} {last_name}
        </h1>
        {weight && (
          <>
            <fieldset className="font-bold">Weight</fieldset>
            <fieldset className="">{weight}</fieldset>
          </>
        )}
        {height && (
          <>
            <fieldset className="font-bold">Height</fieldset>
            <fieldset>{height}</fieldset>{" "}
          </>
        )}
        {hobbies && (
          <>
            <fieldset className="font-bold">Hobbies</fieldset>
            <fieldset>{hobbies}</fieldset>
          </>
        )}
        {education && (
          <>
            <fieldset className="font-bold">{"Education"}</fieldset>
            <fieldset>{education}</fieldset>
          </>
        )}
        {education && (
          <>
            <fieldset className="font-bold">{"Job"}</fieldset>
            <fieldset>{job}</fieldset>
          </>
        )}
        {showButton && (
          <div className="col-span-2 xl:col-span-4 flex">
            <div className="mx-auto">
              <input
                onClick={() =>
                  dispatch?.({
                    type: homepageActions.pickPersonToMeet,
                    payload: editableProfiles?.currentProfile,
                  })
                }
                type={"button"}
                className="bg-green-500 cursor-pointer text-white p-4   "
                value={"Meet " + editableProfiles?.currentProfile.first_name}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default PersonProfile;
