type Props = {
  label: string;
  value: string;
  name: string;
  first?: boolean;
  type?: string;
};
const UniversalTextBox: React.FC<Props> = ({
  first,
  type,
  label,
  value,
  name,
}) => {
  return (
    <fieldset className={`my-2`}>
      <label htmlFor={name}>{label}</label>
      <div className="mt-1">
        <input
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
