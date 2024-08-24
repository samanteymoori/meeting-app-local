import RouteApiClient from "@/helper/routeApiClient";
import { ProfileType } from "@/types/ProfileType";

export class UserService {
  routeApiClient: RouteApiClient;

  constructor(baseUrl: string) {
    this.routeApiClient = new RouteApiClient(baseUrl);
  }
  getUsers = async () => {
    return await this.routeApiClient.get<{
      rows: ProfileType[];
      status: number;
    }>(`/api/user_profiles`, {});
  };
  updateUserDetail = async (userDetail: ProfileType) => {
    return await this.routeApiClient.post(
      `/api/user_profiles/${userDetail.id}/update`,
      userDetail
    );
  };
  getUser = async () => {
    return await this.routeApiClient.get<{
      item: ProfileType;
      status: number;
    }>(`/api/user_profiles`, {});
  };
  signout = async () => {
    return await this.routeApiClient.post<{}>(`/api/auth/user/signout`, {});
  };
}

export const getUserService = (url?: string): UserService => {
  const baseUrl = url || window?.location?.origin;

  return new UserService(baseUrl);
};
