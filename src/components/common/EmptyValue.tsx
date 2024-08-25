import React from "react";

interface EmptyValueProps {
  value?: string | null;
  placeholder?: string;
}

const EmptyValue: React.FC<EmptyValueProps> = ({
  value,
  placeholder = "N/A",
}) => {
  const displayValue = value && value.trim() !== "" ? value : placeholder;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black p-6 rounded-lg shadow-lg border-b border-green-500">
        <span className="text-green-razer text-md font-bold">
          <img
            src="/razer-logo.svg"
            alt="Razer Logo"
            className="w-6 h-auto mx-auto my-2 block"
          />
          {displayValue}
        </span>
      </div>
    </div>
  );
};

export default EmptyValue;
