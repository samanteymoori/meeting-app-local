import { ProfileType } from "@/types/ProfileType";
import homepageActions from "./homepageActions";

export type ProfileState = {
  listOfProfiles: ProfileType[];
  currentProfile: ProfileType;
  currentLocation: any;
};
export enum profileActions {
  changeCurrentProfile,
}
export type Payload = {
  type: homepageActions;
  payload: any;
};
export type HomePageContextType = {
  editableProfiles: null | ProfileState;
  dispatch?: (payload: Payload) => void;
};
