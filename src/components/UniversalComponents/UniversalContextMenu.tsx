import { HomePageContext } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContext";
import { HomePageContextType } from "@/app/[lng]/(private)/(dashboard)/home/contexts/HomePageContextType";
import { topMenu } from "@/fixures/menu";
import { getUserService, UserService } from "@/services/userService";
import { MenuItem } from "@/types/Menu";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { useClickOutside } from "primereact/hooks";

type Props = {
  open: Boolean;
  setOpen: (status: boolean) => void;
};
const UniversalContextMenu: React.FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();
  const { editableProfiles } = useContext<HomePageContextType>(HomePageContext);
  const ctxRef = useRef(null);

  useClickOutside(ctxRef, () => {
    setOpen(false);
  });

  return (
    <>
      {open && (
        <div
          ref={ctxRef}
          className="absolute p-4 transform gap-4 w-[16rem] pb-8 shadow text-center -translate-x-40 text-left bg-white rounded-lg grid "
        >
          {editableProfiles?.authenticatedProfile.first_name && (
            <h1 className="capitalize text-xl text-green-400 p-2">
              {editableProfiles?.authenticatedProfile.first_name}{" "}
              {editableProfiles?.authenticatedProfile.last_name}
            </h1>
          )}
          {topMenu.map((menuItem: MenuItem) => (
            <div
              className="flex mr-auto my-2 [&>*]:self-center gap-2"
              onClick={async () => {
                setOpen(!open);
                if (menuItem.key === "signout") {
                  const userService = getUserService(window.location.href);
                  await userService.signout();
                  router.push("/");
                } else if (menuItem.key === "set-profile-picture") {
                  router.push(`/en/profile`);
                }
              }}
            >
              <div className="mx-2 text-blue-400">
                {menuItem.Icon?.({ size: 32 })}
              </div>
              <h4 className="flex-auto">{menuItem.title}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UniversalContextMenu;
