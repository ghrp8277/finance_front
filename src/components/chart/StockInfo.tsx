import React from "react";

interface StockInfoProps {
  index: number;
  change: number;
  percentage: number;
  yearStart: number;
  lastWeek: number;
}

const StockInfo: React.FC<StockInfoProps> = ({
  index,
  change,
  percentage,
  yearStart,
  lastWeek,
}) => {
  return (
    <div className="stock-info bg-white p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-gray-800">코스피</div>
      <div className="text-4xl font-bold text-blue-600">
        {index.toLocaleString()}
      </div>
      <div
        className={`text-lg ${change < 0 ? "text-red-600" : "text-green-600"}`}
      >
        {change > 0 ? `+${change.toLocaleString()}` : change.toLocaleString()} (
        {percentage}%)
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <div>연초 {yearStart.toLocaleString()}</div>
        <div>지난주 {lastWeek.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default StockInfo;
