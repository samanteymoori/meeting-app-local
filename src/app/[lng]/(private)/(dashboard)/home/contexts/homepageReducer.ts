import { stat } from "fs";
import { rootCertificates } from "tls";
import homepageActions, { meetingStep } from "./homepageActions";
import { ProfileType } from "@/types/ProfileType";
import { PlaceType } from "@/types/PlaceType";

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
              lat: p?.location?.x || p?.location?.lat || null,
              lng: p?.location?.y || p?.location?.lng || null,
            },
            image: {
              src: p.url,
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
    case homepageActions.setAuthenticatedUser: {
      return { ...state, authenticatedProfile: action.payload };
    }
    case homepageActions.setPlace: {
      return {
        ...state,
        currentPlace: {
          ...action.payload,
          location: {
            lat: action.payload.location.lat || action.payload.location.x,
            lng: action.payload.location.lng || action.payload.location.y,
          },
          image: {
            src: action.payload.url,
            size: "small",
          },
        },
      };
    }
    case homepageActions.setPlaces: {
      return {
        ...state,
        places: action.payload.map((p: any) => {
          const profile: PlaceType = {
            ...p,
            location: {
              lat: p?.location?.x || p?.location?.lat || null,
              lng: p?.location?.y || p?.location?.lng || null,
            },
            image: {
              src: p.url,
              size: "small",
            },
          };
          return profile;
        }),
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
            src: action.payload.url,
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
