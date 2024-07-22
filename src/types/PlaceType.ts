import { LatLngExpression, LatLngTuple } from "leaflet";

export type PlaceType = {
  location: LatLngExpression | LatLngTuple;
  name: string;
  image: {
    src: string;
    size: string;
  };
  id?: number;
};
