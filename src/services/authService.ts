import RouteApiClient from "@/helper/routeApiClient";
import { PlaceType } from "@/types/PlaceType";
import { ProfileType } from "@/types/ProfileType";

export class AuthService {
  routeApiClient: RouteApiClient;

  constructor(baseUrl: string) {
    this.routeApiClient = new RouteApiClient(baseUrl);
  }
  getAuthenticatedUser = async () => {
    return await this.routeApiClient.get<{
      item: ProfileType;
      status: number;
    }>(`/api/auth/user`, {});
  };
  registerUser = async (profile: ProfileType) => {
    return await this.routeApiClient.post(`/api/auth/user/register`, profile);
  };
}

export const getAuthService = (url?: string): AuthService => {
  const baseUrl = url || window?.location?.origin;

  return new AuthService(baseUrl);
};
