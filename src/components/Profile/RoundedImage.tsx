import { ProfileType } from "@/types/ProfileType";
import Image from "next/image";

const RoundedImage: React.FC<{
  src: string;
  size: string;
}> = ({ src, size }: { src: string; size: string }) => {
  const items = [
    {
      key: "small",
      w: "w-[5rem] rounded-full ",
      h: "h-[5rem]",
      wrapper: "w-[5.5rem]  rounded-full  h-[5.5rem] self-end m-1",
    },
    {
      key: "medium",
      w: "w-[8rem] rounded-full ",
      h: "h-[8rem]",
      wrapper: "w-[9rem]   rounded-full h-[9rem]  self-end mx-2",
    },

    {
      key: "large",
      w: "w-full object-scale-down rounded-lg",
      h: "h-[25rem]",
      hrem: "25rem",
      wrapper: "  rounded-lg   self-end ",
    },
  ];
  const item = items.find((p) => p.key === size);
  return (
    <div className="">
      <div
        className={`bg-transparent  absolute grid z-20 relative  p-1 ${item?.wrapper} bg-slate-200 cursor-pointer`}
      >
        <div className="rounded-lg">
          <Image
            className={`shadow-xl mx-auto self-center object-top  mx-auto self-center ${item?.w} ${item?.h} object-cover`}
            src={src}
            width={512}
            height={512}
            alt={""}
          />
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${src})` }}
        className={`relative transform -translate-y-[25rem] blur-lg z-10 ${item?.w} ${item?.h}`}
      ></div>
    </div>
  );
};
export default RoundedImage;
