"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { getChartConfig } from "./chartConfig";
import { IStockResponse } from "../../types/stock";
import { parseDate } from "../../utils/dateUtils";

Chart.register(annotationPlugin);

const StockChart: React.FC<{ data: IStockResponse }> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (data.stocks.stocks.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const labels = data.stocks.stocks.map((item) => {
          const date = parseDate(item.date);
          return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        });
        const closingPrices = data.stocks.stocks.map(
          (item) => item.close_price
        );

        const config = getChartConfig(
          labels,
          closingPrices,
          [],
          [],
          [],
          [],
          []
        );
        chartInstanceRef.current = new Chart(ctx, config);
      }
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default StockChart;
