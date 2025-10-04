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
      <div className="overflow-y-scroll md:overflow-y-hidden  h-full w-screen md:w-auto  rounded-lg  [&>*]:p-4  block">
        <div className="">
          <h1 className="col-span-4 capitalize xl:col-span-4 text-2xl text-green-500 ">
            {first_name} {last_name}
          </h1>
        </div>
        <div className="inline-block w-[200px]">
          {weight && (
            <>
              <div className="font-bold">Weight</div>
              <div className="">{parseFloat(weight)?.toFixed(2)}</div>
            </>
          )}
        </div>
        <div className="inline-block w-[200px]">
          {height && (
            <>
              <div className="font-bold">Height</div>
              <div className="inline-block w-[200px]">
                {parseFloat(height)?.toFixed(2)}
              </div>{" "}
            </>
          )}
        </div>
        <div className="inline-block w-[200px]">
          {hobbies && (
            <>
              <div className="font-bold">Hobbies</div>
              <div className="inline-block w-[200px]">{hobbies}</div>
            </>
          )}
        </div>
        <div className="inline-block w-[200px]">
          {education && (
            <>
              <div className="font-bold">{"Education"}</div>
              <div className="inline-block w-[200px]">{education}</div>
            </>
          )}
        </div>
        <div className="inline-block w-[200px]">
          {education && (
            <>
              <div className="font-bold">{"Job"}</div>
              <div className="inline-block w-[200px]">{job}</div>
            </>
          )}
        </div>
        {showButton && (
          <div className="col-span-4 xl:col-span-4 w-full flex">
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
