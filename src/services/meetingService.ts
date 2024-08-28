import RouteApiClient from "@/helper/routeApiClient";

export class MeetingService {
  routeApiClient: RouteApiClient;

  constructor(baseUrl: string) {
    this.routeApiClient = new RouteApiClient(baseUrl);
  }
  getActiveMeeting = async ({ email }: { email: string }) => {
    return await this.routeApiClient.get<any>(
      `/api/meetings/${email}/participants`,
      {}
    );
  };
  submitMeeting = async ({
    person_to_meet_id,
    owner_person_id,
    place_id,
    meeting_date,
    meeting_time,
  }: any) => {
    return await this.routeApiClient.post<any>(`/api/meetings`, {
      person_to_meet_id,
      owner_person_id,
      place_id,
      meeting_date,
      meeting_time,
    });
  };
  actionMeeting = async ({
    meeting_id,
    action,
  }: {
    meeting_id: string;
    action: string;
  }) => {
    return await this.routeApiClient.post<any>(
      `/api/meetings/${meeting_id}/action/${action}`,
      {}
    );
  };
}

export const getMeetingService = (url?: string): MeetingService => {
  const baseUrl = url || window?.location?.origin;

  return new MeetingService(baseUrl);
};
