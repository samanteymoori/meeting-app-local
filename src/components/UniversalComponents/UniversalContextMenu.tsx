import { topMenu } from "@/fixures/menu";
import { getUserService, UserService } from "@/services/userService";
import { MenuItem } from "@/types/Menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  open: Boolean;
  setOpen: (status: boolean) => void;
};
const UniversalContextMenu: React.FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <>
      {open && (
        <div className="absolute p-4 transform gap-4 w-40 text-center -translate-x-16 bg-white rounded-lg flex">
          {topMenu.map((menuItem: MenuItem) => (
            <div
              className="flex mx-auto [&>*]:self-center gap-2"
              onClick={async () => {
                setOpen(!open);
                if (menuItem.key === "signout") {
                  const userService = getUserService(window.location.href);
                  await userService.signout();
                  router.push("/");
                }
              }}
            >
              <div>{menuItem.Icon?.()}</div>
              <h4 className="flex-auto">{menuItem.title}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UniversalContextMenu;
