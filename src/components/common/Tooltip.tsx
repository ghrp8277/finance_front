import React, { useState } from "react";

type TooltipProps = {
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
  alwaysVisible?: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({
  message,
  position = "right",
  children,
  className = "",
  alwaysVisible = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {(isVisible || alwaysVisible) && (
        <div
          className={`absolute z-10 p-2 text-sm text-gray-500 bg-white rounded shadow-md ${getTooltipPosition(
            position
          )} ${className}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

const getTooltipPosition = (position: "top" | "bottom" | "left" | "right") => {
  switch (position) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "right-full top-1/2 transform -translate-y-1/2 mr-2";
    case "right":
      return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    default:
      return "";
  }
};

export default Tooltip;
