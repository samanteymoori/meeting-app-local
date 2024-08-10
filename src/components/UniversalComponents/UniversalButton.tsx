import { PropsWithChildren } from "react";

type Props = {
  value: string;
  type: "button" | "submit";
  className?: string;
  onClick: (e: any) => void;
};
const UniversalButton: React.FC<PropsWithChildren<Props>> = ({
  value,
  className,
  children,
  onClick,
  type,
}) => {
  return (
    <input
      className={`bg-blue-400 text-white cursor-pointer rounded-lg p-4 ${className}`}
      type={type}
      onClick={onClick}
      value={value}
    >
      {children}
    </input>
  );
};
export default UniversalButton;
