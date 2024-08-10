import { URL } from "url";

export const navigation_items = {
  auth: {
    login: "login/email",
    signup: "signup",
  },
  private: {
    home: "home",
  },
};
export const createNavigationLink = (
  navigation_path: string,
  base_url?: URL
) => {
  return `${base_url?.origin || ""}/en/${navigation_path}`;
};

export const containsPath = (path: URL, navigation_item_path: string) => {
  return path.pathname.includes(navigation_item_path);
};
