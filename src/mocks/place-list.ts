import { PlaceType } from "@/types/PlaceType";

export const placesList: Array<PlaceType> = [
  {
    id: 1,
    name: "Starbox Coffee",
    location: [49.2609, -123.1139],
    image: {
      src: "/images/profile2.jpg",
      size: "small",
    },
  },
  {
    id: 2,
    location: [49.3043, -123.1443],
    name: "Burger King",
    image: {
      src: "/images/profile3.jpg",
      size: "small",
    },
  },
  {
    id: 3,
    name: "Mac Donalds",
    location: [49.2713, -123.134],
    image: {
      src: "/images/profile4.webp",
      size: "small",
    },
  },
  {
    id: 4,
    name: "KFC",
    location: [49.2745, -123.153],
    image: {
      src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fHByb2ZpbGV8ZW58MHx8fHwxNjM4NjY0MzE0&ixlib=rb-1.2.1&q=80&w=400",
      size: "small",
    },
  },
];
