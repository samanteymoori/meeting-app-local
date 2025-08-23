import { PlaceType } from "@/types/PlaceType";
import { useContext, useEffect } from "react";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";
import Picture from "./Picture";

type Props = {
  showButton: boolean;
};
const PersonProfile: React.FC<Props> = ({ showButton }) => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  if (!editableProfiles?.currentPlace) return null;
  const { name, working_hours_start, working_hours_end, address, phone }: any =
    editableProfiles?.currentPlace;
  return (
    <div className="col-span-6 p-0 modal  mx-auto gap-2 h-full bg-white  grid md:grid-cols-1 overflow-scroll">
      <div className="grid grid-cols-2">
        <div className="">
          <Picture />
        </div>
        <div className="  h-full  rounded-lg grid gap-x-4 gap-y-2 [&>*]:p-4 [&>*]:flex-auto ">
          <h1 className="col-span-2 xl:col-span-4 text-2xl text-green-500 ">
            {name}
          </h1>
          <div className="xl:col-span-4">
            {working_hours_start} - {working_hours_end}
          </div>
          <div className="xl:col-span-4">{address}</div>
          <div className="xl:col-span-4">{phone}</div>
          {showButton && (
            <div className="col-span-2 xl:col-span-4 flex">
              <div className="mx-auto">
                <input
                  onClick={() => {
                    dispatch?.({
                      type: homepageActions.pickPlaceToMeet,
                      payload: editableProfiles?.currentLocation,
                    });
                  }}
                  type={"button"}
                  className="bg-green-500 cursor-pointer text-white p-4   "
                  value={"Meet at " + name}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PersonProfile;
