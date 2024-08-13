import { stat } from "fs";
import { rootCertificates } from "tls";
import homepageActions, { meetingStep } from "./homepageActions";
import { ProfileType } from "@/types/ProfileType";

const homepageReducer = (state: any, action: any) => {
  switch (action.type) {
    case homepageActions.setGeoLocation: {
      return {
        ...state,
        currentLocation: action.payload,
      };
    }
    case homepageActions.setProfiles: {
      return {
        ...state,
        listOfProfiles: action.payload.map((p: any) => {
          const profile: ProfileType = {
            ...p,
            location: {
              lat: p.location.x,
              lng: p.location.y,
            },
            image: {
              src: "/images/profile.jpg",
              size: "small",
            },
          };
          return profile;
        }),
      };
    }
    case homepageActions.pickPersonToMeet: {
      return {
        ...state,
        step: meetingStep.book,
        personToMeet: action.payload,
      };
    }
    case homepageActions.setStep: {
      return { ...state, step: action.payload };
    }
    case homepageActions.pickPlaceToMeet: {
      return {
        ...state,
        meetingPlace: action.payload,
        step: meetingStep.meet,
      };
    }
    case homepageActions.initProfiles: {
      return {
        ...state,
        authenticatedProfile: action.payload.authenticatedProfile,
        listOfProfiles: action.payload.listOfProfiles,
        currentProfile: action.payload.currentProfile,
      };
    }
    case homepageActions.setPlace: {
      return {
        ...state,
        currentPlace: action.payload,
      };
    }
    case homepageActions.setProfile: {
      return {
        ...state,
        currentProfile: {
          ...action.payload,
          location: {
            lat: action.payload.location.lat || action.payload.location.x,
            lng: action.payload.location.lng || action.payload.location.y,
          },
          image: {
            src: "/images/profile.jpg",
            size: "small",
          },
        },
      };
    }

    default:
      return state;
  }
};

export default homepageReducer;
