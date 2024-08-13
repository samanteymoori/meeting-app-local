import { MenuItem } from "@/types/Menu";
import { FaImage, FaSignOutAlt } from "react-icons/fa";
export const topMenu: MenuItem[] = [
  {
    key: "set-profile-picture",
    title: "Set Profile Picture",
    Icon: FaImage,
  },
  {
    key: "signout",
    title: "Sign out",
    Icon: FaSignOutAlt,
  },
];
