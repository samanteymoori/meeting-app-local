import { PlaceType } from "@/types/PlaceType";
import { ProfileType } from "@/types/ProfileType";
import homepageActions, { meetingStep } from "./homepageActions";

export type ProfileState = {
  directions: any;
  listOfProfiles: ProfileType[];
  currentProfile: ProfileType;
  currentPlace: PlaceType;
  authenticatedProfile: ProfileType;
  places: PlaceType[];
  meetingPlace: PlaceType | null | undefined;
  meetingDate: any;
  meetingTime: any;
  meetingRecord: any;
  currentLocation: any;
  step: meetingStep;
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
