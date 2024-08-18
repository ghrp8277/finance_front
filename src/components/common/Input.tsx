import React from "react";

type InputProps = {
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
};

const baseClasses =
  "w-full p-2 border-b bg-black text-green-500 border-gray-700 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1";

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className = "",
  name,
  minLength,
  maxLength,
  disabled,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      name={name}
      minLength={minLength}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
};

export default Input;
