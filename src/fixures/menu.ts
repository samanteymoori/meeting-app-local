import { MenuItem } from "@/types/Menu";
import { FaImage, FaSignOutAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export const topMenu: MenuItem[] = [
  {
    key: "set-profile-picture",
    title: "Profile Settings",
    Icon: IoSettingsSharp,
  },
  {
    key: "signout",
    title: "Sign out",
    Icon: FaSignOutAlt,
  },
];
