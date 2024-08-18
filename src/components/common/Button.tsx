import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red" | "slate" | "sky" | "none" | "neonGreen";
  purpose?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
};

const sizeClasses = {
  small: "text-sm px-2 py-1",
  medium: "text-md px-4 py-2",
  large: "text-lg px-6 py-3",
};

const colorClasses = {
  blue: "bg-blue-500 hover:bg-blue-700 text-white",
  green: "bg-green-500 hover:bg-green-700 text-white",
  red: "bg-red-500 hover:bg-red-700 text-white",
  slate: "bg-slate-500 hover:bg-slate-700 text-white",
  sky: "bg-sky-500 hover:bg-sky-700 text-white",
  none: "bg-inherit text-black",
  neonGreen:
    "bg-black text-green-400 border border-green-400 hover:text-green-300 hover:border-green-300",
};

const disabledClasses =
  "bg-gray-900 text-gray-600 border-gray-700 cursor-not-allowed opacity-70";

const purposeClasses = {
  primary: "",
  secondary: "bg-gray-500 hover:bg-gray-700 text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  size = "medium",
  color = "neonGreen",
  purpose = "primary",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded ${sizeClasses[size]} ${
        disabled
          ? disabledClasses
          : `${colorClasses[color]} ${purposeClasses[purpose]}`
      } ${className} whitespace-nowrap focus:outline-none transition-all duration-300 ease-in-out`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
