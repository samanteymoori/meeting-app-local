import RouteApiClient from "@/helper/routeApiClient";
import { PlaceType } from "@/types/PlaceType";

export class PlaceService {
  routeApiClient: RouteApiClient;

  constructor(baseUrl: string) {
    this.routeApiClient = new RouteApiClient(baseUrl);
  }
  getPlaces = async () => {
    return await this.routeApiClient.get<{
      rows: PlaceType[];
      status: number;
    }>(`/api/places`, {});
  };
}

export const getPlaceService = (url?: string): PlaceService => {
  const baseUrl = url || window?.location?.origin;

  return new PlaceService(baseUrl);
};
