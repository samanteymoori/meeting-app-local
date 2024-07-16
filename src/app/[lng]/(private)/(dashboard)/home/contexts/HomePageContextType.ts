import { ProfileType } from "@/types/ProfileType";

export type HomePageContextType = {
  listOfProfiles: ProfileType[];
  currentProfile?: ProfileType | null;
  setCurrentProfile?: (current: ProfileType) => void | null;
};
