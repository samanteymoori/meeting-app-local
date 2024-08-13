import { topMenu } from "@/fixures/menu";
import { MenuItem } from "@/types/Menu";
import { useState } from "react";

type Props = {
  open: Boolean;
  setOpen: (status: boolean) => void;
};
const UniversalContextMenu: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div className="absolute p-4 transform gap-4 w-40 text-center -translate-x-16 bg-white rounded-lg flex">
          {topMenu.map((menuItem: MenuItem) => (
            <div
              className="flex mx-auto [&>*]:self-center gap-2"
              onClick={() => {
                setOpen(!open);
                if (menuItem.key === "signout") {
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
