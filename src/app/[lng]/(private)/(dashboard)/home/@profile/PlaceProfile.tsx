import { PlaceType } from "@/types/PlaceType";
import { useContext } from "react";
import homepageActions from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

type Props = {
  showButton: boolean;
};
const PersonProfile: React.FC<Props> = ({ showButton }) => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  const { name, workingHours, address, phone }: any =
    editableProfiles?.currentPlace;
  return (
    <div className="  h-full  rounded-lg grid gap-x-4 gap-y-2 [&>*]:p-4 [&>*]:flex-auto flex">
      <h1 className="col-span-2 xl:col-span-4 text-2xl text-green-500 ">
        {name}
      </h1>
      <fieldset className="font-bold">Hours:</fieldset>
      <fieldset className="">
        {workingHours.start} - {workingHours.end}
      </fieldset>
      <fieldset className="font-bold">Address</fieldset>
      <fieldset>{address}</fieldset>
      <fieldset className="font-bold">Phone</fieldset>
      <fieldset>{phone}</fieldset>
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
  );
};
export default PersonProfile;
