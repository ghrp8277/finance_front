import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectBoxProps = {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  selectedValue,
  onChange,
  label,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 text-xs text-green-400 font-bold">{label}</label>
      )}
      <select
        value={selectedValue}
        onChange={handleChange}
        className="p-1 bg-black text-green-razer text-sm border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:bg-green-500 hover:text-black"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-black text-green-400 hover:bg-green-500 hover:text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
