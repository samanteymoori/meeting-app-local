import { LatLngExpression, LatLngTuple } from "leaflet";

export type PlaceType = {
  location: LatLngExpression | LatLngTuple;
  workingHours: {
    start: string;
    end: string;
  };
  address: string;
  phone: string;
  name: string;
  image: {
    src: string;
    size: string;
  };
  id?: number;
};
