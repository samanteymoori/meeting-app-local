type Props = {
  label: string;
  value: string;
  name: string;
  first?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
};
const UniversalTextBox: React.FC<Props> = ({
  first,
  type,
  className,
  label,
  value,
  name,
  defaultValue,
  onChange,
}) => {
  return (
    <fieldset className={`my-2 ${className}`}>
      <label htmlFor={name}>{label}</label>
      <div className="mt-1 grid">
        <input
          defaultValue={defaultValue}
          onChange={onChange}
          className="border p-2 rounded-lg"
          type={type || "text"}
          name={name}
          value={value}
        />
      </div>
    </fieldset>
  );
};
export default UniversalTextBox;
