enum homepageActions {
  setPlace,
  setProfile,
  initProfiles,
  setGeoLocation,
  setStep,
  pickPersonToMeet,
  pickPlaceToMeet,
  setMeetLocation,
}
export enum meetingStep {
  find = 0,
  book = 1,
  meet = 2,
}

export default homepageActions;
