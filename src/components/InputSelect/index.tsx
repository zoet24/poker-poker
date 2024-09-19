interface InputSelectProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  placeholder,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="input-select flex flex-col cursor-pointer">
      <label className="mb-1">{label}</label>
      <select value={value} onChange={onChange} className="box p-1">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
