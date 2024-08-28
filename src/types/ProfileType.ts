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
  first_name: string;
  status?: "pending" | "accepted" | "rejected";
  last_name: string;
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
