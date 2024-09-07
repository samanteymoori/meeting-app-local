import { getAuthService } from "@/services/authService";
import { getMeetingService } from "@/services/meetingService";
import { useContext, useEffect } from "react";
import homepageActions, {
  meetingStep,
} from "../[lng]/(private)/(dashboard)/home/contexts/homepageActions";
import { HomePageContext } from "../[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "../[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";

const useMeetings = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);

  useEffect(() => {
    // if (editableProfiles?.step === meetingStep.detail) {
    getAuthenticatedUser();
    // }
  }, [editableProfiles?.step]);

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
      }
    });
  };
};
export default useMeetings;
