import React from "react";
import Input from "./Input";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red" | "slate" | "sky" | "none";
  disabled?: boolean;
  className?: string;
  buttonLabel?: string;
  searchOptions?: string[];
  selectedOption: string;
  onOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const sizeClasses = {
  small: "text-sm h-10 px-3",
  medium: "text-md h-12 px-4",
  large: "text-lg h-14 px-5",
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "검색어를 입력하세요.",
  value,
  onChange,
  onSearch,
  size = "medium",
  color = "none",
  disabled = false,
  className = "",
  buttonLabel = "검색",
  searchOptions = [],
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <select
        value={selectedOption}
        onChange={onOptionChange}
        className="mr-2 p-2 border rounded bg-black text-green-500 border-green-500"
      >
        {searchOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`flex-grow border rounded-l ${sizeClasses[size]} bg-black text-green-500 !border-green-500 focus:ring-green-500 focus:ring-1`}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchInput;
