import RouteApiClient from "@/helper/routeApiClient";
import { PlaceType } from "@/types/PlaceType";

export class PlaceService {
  routeApiClient: RouteApiClient;

  constructor(baseUrl: string) {
    this.routeApiClient = new RouteApiClient(baseUrl);
  }
  addPlace = async (place: PlaceType) => {
    return await this.routeApiClient.post<PlaceType>(`/api/places/add`, place);
  };
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
