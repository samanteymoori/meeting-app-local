enum homepageActions {
  setPlace,
  setPlaces,
  setProfile,
  setProfiles,
  initProfiles,
  setGeoLocation,
  setStep,
  pickPersonToMeet,
  pickPlaceToMeet,
  setMeetLocation,
  setAuthenticatedUser,
  setMeetingDate,
  setMeetingTime,
  setMeetingRecord,
}
export enum meetingStep {
  find = 0,
  book = 1,
  meet = 2,
  detail = 3,
}

export default homepageActions;
