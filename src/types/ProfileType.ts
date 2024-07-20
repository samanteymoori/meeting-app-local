import { LatLngExpression, LatLngTuple } from "leaflet";

export type ProfileType = {
  weight: string;
  firstName: string;
  lastName: string;
  height: string;
  location: LatLngExpression | LatLngTuple;
  hobbies: string;
  education: string;
  job: string;
  image: {
    src: string;
    size: string;
  };
  id?: string;
};
