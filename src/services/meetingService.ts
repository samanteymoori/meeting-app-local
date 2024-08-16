import RouteApiClient from "@/helper/routeApiClient";

export class MeetingService {
  routeApiClient: RouteApiClient;

  constructor(baseUrl: string) {
    this.routeApiClient = new RouteApiClient(baseUrl);
  }
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
}

export const getMeetingService = (url?: string): MeetingService => {
  const baseUrl = url || window?.location?.origin;

  return new MeetingService(baseUrl);
};
