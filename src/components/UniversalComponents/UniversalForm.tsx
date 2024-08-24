import { PropsWithChildren } from "react";

type Props = {
  action: string;
  className: string;
  onSubmit: any;
};
const UniversalForm: React.FC<PropsWithChildren<Props>> = ({
  action,
  className,
  onSubmit,
  children,
}) => {
  return (
    <form
      action={action}
      onSubmit={onSubmit}
      className={`p-4 bg-white rounded-lg grid ${className}`}
    >
      {children}
    </form>
  );
};
export default UniversalForm;
