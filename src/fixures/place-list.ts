import { PlaceType } from "@/types/PlaceType";

export const placesList: Array<PlaceType> = [
  {
    id: 1,
    name: "Starbox Coffee",
    location: [49.2609, -123.1139],
    address: " 555 West Georgia Street, Vancouver, BC V6B 1Z5",
    phone: "(604) 555-5678",
    workingHours: { start: "10:00", end: "19:00" },
    image: {
      src: "/images/starbucks.jpg",
      size: "rectangle-small",
    },
  },
  {
    id: 2,
    location: [49.3043, -123.1443],
    workingHours: { start: "10:00", end: "19:00" },
    name: "Burger King",
    address: "2705 West Broadway, Vancouver, BC V6K 2G4",
    phone: "(604) 555-5678",
    image: {
      src: "/images/burger-king.png",
      size: "rectangle-small",
    },
  },
  {
    id: 3,
    name: "Mac Donalds",
    location: [49.2713, -123.134],
    workingHours: { start: "10:00", end: "19:00" },
    address: "333 East Broadway, Vancouver, BC V5T 1W5",
    phone: "(604) 555-9012",
    image: {
      src: "/images/mc_donalds.png",
      size: "rectangle-small",
    },
  },
  {
    id: 4,
    name: "KFC",
    location: [49.2745, -123.153],
    workingHours: { start: "10:00", end: "19:00" },
    address: "1045 Denman Street, Vancouver, BC V6G 2M4",
    phone: "(604) 555-3456",
    image: {
      src: "/images/kfc.png",
      size: "rectangle-small",
    },
  },
];
