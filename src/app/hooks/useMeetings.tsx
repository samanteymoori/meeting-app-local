import { getAuthService } from "@/services/authService";
import { getMeetingService } from "@/services/meetingService";
import { useContext, useEffect, useState } from "react";
import homepageActions, {
  meetingStep,
} from "../[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "../[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "../[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";

const useMeetings = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  const getDirection = (meeting: any) => {
    const directionsService = new google.maps.DirectionsService();
    let origin: any = {
      lat: editableProfiles?.authenticatedProfile.location?.x,
      lng: editableProfiles?.authenticatedProfile.location?.y,
    };
    let destination = {
      lat: meeting.place_location?.x,
      lng: meeting.place_location?.y,
    };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          dispatch?.({
            type: homepageActions.setDirections,
            payload: result,
          });
        }
      }
    );
  };
  useEffect(() => {
    getAuthenticatedUser();
  }, [editableProfiles?.step, editableProfiles?.updateStatus]);

  const getAuthenticatedUser = async () => {
    const authService = getAuthService();
    const authenticatedUser = await authService.getAuthenticatedUser();
    dispatch?.({
      type: homepageActions.setAuthenticatedUser,
      payload: authenticatedUser?.item,
    });

    await getActiveMeetings(authenticatedUser.item?.username);
  };
  const getActiveMeetings = async (email: string) => {
    const meetingService = getMeetingService();
    meetingService.getActiveMeeting({ email }).then((response) => {
      if (response.rows.length) {
        dispatch?.({
          type: homepageActions.setMeetingRecord,
          payload: response.rows[0],
        });
        dispatch?.({
          type: homepageActions.setStep,
          payload: meetingStep.detail,
        });
        if (editableProfiles?.authenticatedProfile.location)
          getDirection(response.rows[0]);
      }
    });
  };
};
export default useMeetings;
