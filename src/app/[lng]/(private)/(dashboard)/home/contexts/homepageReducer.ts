import homepageActions from "./homepageActions";

const homepageReducer = (state: any, action: any) => {
  switch (action.type) {
    case homepageActions.setGeoLocation: {
      return {
        ...state,
        currentLocation: action.payload,
      };
    }
    case homepageActions.initProfiles: {
      return {
        ...state,
        listOfProfiles: action.payload.listOfProfiles,
        currentProfile: action.payload.currentProfile,
      };
    }

    case homepageActions.setProfile: {
      return {
        ...state,
        currentProfile: action.payload,
      };
    }

    default:
      return state;
  }
};

export default homepageReducer;
