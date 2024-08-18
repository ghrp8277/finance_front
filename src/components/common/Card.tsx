import React from "react";

type CardProps = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  badgeColor?: "blue" | "green" | "red" | "yellow" | "gray";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const badgeColorClasses = {
  blue: "bg-blue-900 text-blue-400",
  green: "bg-green-900 text-green-400",
  red: "bg-red-900 text-red-400",
  yellow: "bg-yellow-900 text-yellow-400",
  gray: "bg-gray-900 text-gray-400",
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  badgeText,
  badgeColor = "gray",
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`p-4 bg-gray-900 text-green-400 border border-green-500 rounded-lg shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center transform transition-transform duration-200 hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <div className="text-center">
        <h2 className="text-lg font-bold text-green-400">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {badgeText && (
          <div
            className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${badgeColorClasses[badgeColor]}`}
          >
            {badgeText}
          </div>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default Card;
