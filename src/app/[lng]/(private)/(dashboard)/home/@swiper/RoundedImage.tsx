import Image from "next/image";

type Props = {
  src: string;
  size: "small" | "medium" | "large";
};
const RoundedImage: React.FC<Props> = ({ src, size }) => {
  const items = [
    {
      key: "small",
      w: "w-[10rem]",
      h: "h-[10rem]",
      wrapper: "w-[11rem] h-[11rem] self-end m-2",
    },
    {
      key: "medium",
      w: "w-[20rem]",
      h: "h-[20rem]",
      wrapper: "w-[21rem] h-[21rem]  self-end mx-2",
    },
  ];
  const item = items.find((p) => p.key === size);
  return (
    <div
      className={`bg-white p-2 rounded-full ${item?.wrapper} bg-slate-200 cursor-pointer`}
    >
      <Image
        className={`shadow-xl mx-auto self-center ${item?.w} ${item?.h} rounded-full object-cover`}
        src={src}
        width={512}
        height={512}
        alt={""}
      />
    </div>
  );
};
export default RoundedImage;
