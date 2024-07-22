import { PlaceType } from "@/types/PlaceType";

export const placesList: Array<PlaceType> = [
  {
    id: 1,
    name: "Starbox Coffee",
    location: [49.2609, -123.1139],
    image: {
      src: "/images/starbucks.jpg",
      size: "rectangle-small",
    },
  },
  {
    id: 2,
    location: [49.3043, -123.1443],
    name: "Burger King",
    image: {
      src: "/images/burger-king.png",
      size: "rectangle-small",
    },
  },
  {
    id: 3,
    name: "Mac Donalds",
    location: [49.2713, -123.134],
    image: {
      src: "/images/mc_donalds.png",
      size: "rectangle-small",
    },
  },
  {
    id: 4,
    name: "KFC",
    location: [49.2745, -123.153],
    image: {
      src: "/images/kfc.png",
      size: "rectangle-small",
    },
  },
];
