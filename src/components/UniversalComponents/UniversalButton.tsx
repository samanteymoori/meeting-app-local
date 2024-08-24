import { PropsWithChildren } from "react";
import { Bars } from "react-loading-icons";

type Props = {
  value: string;
  type: "button" | "submit";
  loading: boolean;
  className?: string;
  onClick?: (e: any) => void;
};
const UniversalButton: React.FC<PropsWithChildren<Props>> = ({
  value,
  loading,
  className,
  children,
  onClick,
  type,
}) => {
  return (
    <input
      disabled={loading}
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
