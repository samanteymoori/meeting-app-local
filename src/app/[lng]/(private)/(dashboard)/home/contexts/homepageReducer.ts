import { stat } from "fs";
import { rootCertificates } from "tls";
import homepageActions, { meetingStep } from "./homepageActions";
import { ProfileType } from "@/types/ProfileType";
import { PlaceType } from "@/types/PlaceType";

const homepageReducer = (state: any, action: any) => {
  switch (action.type) {
    case homepageActions.setGeoLocation: {
      const location = action.payload;
      return {
        ...state,
        authenticatedProfile: {
          ...state.authenticatedProfile,
          location,
        },
        currentLocation: action.payload,
      };
    }
    case homepageActions.setProfiles: {
      return {
        ...state,
        listOfProfiles: action.payload
          .filter((p: any) => p.id !== state.authenticatedProfile?.id)
          .map((p: any) => {
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
        meetingDate: new Date(),
      };
    }
    case homepageActions.setMeetingRecord: {
      return {
        ...state,
        meetingRecord: action.payload,
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
    case homepageActions.updateStatus: {
      return { ...state, updateStatus: action.payload };
    }
    case homepageActions.initProfiles: {
      return {
        ...state,
        authenticatedProfile: action.payload.authenticatedProfile,
        listOfProfiles: action.payload.listOfProfiles,
        currentProfile: action.payload.currentProfile,
      };
    }
    case homepageActions.setMeetingTime: {
      return {
        ...state,
        meetingTime: action.payload,
      };
    }
    case homepageActions.setMeetingDate: {
      return {
        ...state,
        meetingDate: action.payload,
      };
    }
    case homepageActions.setAuthenticatedUser: {
      const listOfProfiles = state.listOfProfiles.filter(
        (p: any) => p.id !== action.payload?.id
      );
      return { ...state, authenticatedProfile: action.payload, listOfProfiles };
    }
    case homepageActions.setDirections: {
      return { ...state, directions: action.payload };
    }
    case homepageActions.removeDirections: {
      return { ...state, directions: null };
    }
    case homepageActions.setPlace: {
      return {
        ...state,
        currentPlace: {
          ...action.payload,
          location: {
            lat: action?.payload?.location?.lat || action.payload.location.x,
            lng: action?.payload?.location?.lng || action.payload.location.y,
          },
          image: {
            src: action.payload.url,
            size: "small",
          },
        },
      };
    }
    case homepageActions.cancelMeeting: {
      return {
        step: meetingStep.find,
        places: state.places,
        currentProfile: state.currentProfile,
        authenticatedProfile: state.authenticatedProfile,
        listOfProfiles: state.listOfProfiles,
        currentLocation: state.currentLocation,
        currentPlace: state.currentPlace,
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
            lat:
              action?.payload?.location?.lat ||
              action?.payload?.location?.x ||
              45,
            lng:
              action?.payload?.location?.lng ||
              action?.payload?.location?.y ||
              45,
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
