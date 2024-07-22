import { LatLngExpression, LatLngTuple } from "leaflet";
const classA = {
  method: () => {
    return {
      m: () => {},
    };
  },
};
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
