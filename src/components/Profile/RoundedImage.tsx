import { ProfileType } from "@/types/ProfileType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { boolean } from "zod";

const RoundedImage: React.FC<{
  src: string;
  backdrop?: "backdrop" | null | undefined;
  size: string;
  onClick?: any;
  first_name?: string;
  last_name?: string;
}> = ({
  src,
  size,
  backdrop,
  onClick,
  first_name,
  last_name,
}: {
  backdrop?: "backdrop" | null | undefined;
  src: string;
  size: string;
  onClick?: any;
  first_name?: string;
  last_name?: string;
}) => {
  const items = [
    {
      key: "profile",
      w: "w-12 rounded-full object-cover",
      h: "h-12",
      wrapper: "rounded-full",
    },
    {
      key: "smaller",
      w: "w-[4rem] rounded-full object-cover",
      h: "h-[4rem]",
      wrapper: "rounded-full",
    },
    {
      key: "small",
      w: "w-[5rem] rounded-full object-cover",
      h: "h-[5rem]",
      wrapper: "w-[5.5rem]   rounded-full  h-[5.5rem] self-end m-1",
    },
    {
      key: "rectangle-small",
      w: "w-[5rem] rounded-lg object-scale-down",
      h: "h-[5rem]",
      wrapper: "w-[6rem]   rounded-lg  h-[6rem] self-end m-1",
    },
    {
      key: "medium",
      w: "w-[8rem] rounded-full object-cover",
      h: "h-[8rem]",
      wrapper: "w-[9rem]   rounded-full h-[9rem]  self-end mx-2",
    },

    {
      key: "large-rounded",
      w: "w-full object-cover p-8 rounded-full",
      h: "h-[25rem]",
      hrem: "25rem",
      wrapper: " rounded-lg  rounded-full self-end ",
    },
    {
      key: "large",
      w: "w-full object-scale-down p-8 rounded-lg",
      h: "h-[25rem]",
      hrem: "25rem",
      wrapper:
        " rounded-lg   self-end bg-transparent  absolute   z-20 relative  ",
    },
  ];
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const [color, setColor] = useState<string>("white");
  useEffect(() => {
    setColor(`${getRandomColor()}`);
  }, []);
  const item = items.find((p) => p.key === size);
  const [error, setError] = useState<boolean>(false);
  if (!src && size === "small") {
    return (
      <>
        <div className={`${item?.wrapper} `} onClick={onClick}>
          <div
            className={`grid  p-1 ${item?.wrapper} ${
              backdrop && backdrop === "backdrop" ? "bg-slate-200" : ""
            } cursor-pointer`}
          >
            <div className="rounded-lg">
              <div
                style={{ backgroundColor: color }}
                className={` mx-auto flex self-center object-top  mx-auto self-center ${item?.w} ${item?.h} `}
              >
                <div className="mx-auto text-2xl font-bold text-white self-center">
                  {first_name?.substring(0, 1)?.toUpperCase()}
                  {last_name?.substring(0, 1)?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
          {backdrop && backdrop === "backdrop" && (
            <div
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
              }}
              className={`absolute transform -translate-y-[25rem] blur-xl z-10 ${item?.w} ${item?.h}`}
            ></div>
          )}
        </div>
      </>
    );
  } else {
    if (!src) src = "/images/user.png";
  }
  return (
    <div className={`${item?.wrapper} `} onClick={onClick}>
      <div
        className={`grid  p-1 ${item?.wrapper} ${
          backdrop && backdrop === "backdrop" ? "bg-slate-200" : ""
        } cursor-pointer`}
      >
        <div className="rounded-lg">
          <Image
            className={` mx-auto self-center object-top  mx-auto self-center ${item?.w} ${item?.h} `}
            src={src}
            width={512}
            height={512}
            alt={""}
            onError={(e: any) => {
              // e.target.src = "/images/user.png";
            }}
          />
        </div>
      </div>
      {backdrop && backdrop === "backdrop" && (
        <div
          style={{ backgroundImage: `url(${src})`, backgroundSize: "cover" }}
          className={`absolute transform -translate-y-[25rem] blur-xl z-10 ${item?.w} ${item?.h}`}
        ></div>
      )}
    </div>
  );
};
export default RoundedImage;
