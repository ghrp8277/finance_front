import React, { useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface ChartComponentProps {
  stockData: Array<{
    date: string;
    closePrice: number;
  }>;
  rsi: number[];
  sma12: number[];
  sma20: number[];
  sma26: number[];
  macdLine: number[];
  signalLine: number[];
  histogram: number[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  stockData,
  rsi,
  sma12,
  sma20,
  sma26,
  macdLine,
  signalLine,
  histogram,
}) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    const loadZoomPlugin = async () => {
      const { default: zoomPlugin } = await import("chartjs-plugin-zoom");
      ChartJS.register(zoomPlugin);

      if (chartRef.current) {
        chartRef.current.update();
      }
    };

    loadZoomPlugin();
  }, []);

  const chartData: any = {
    labels: stockData.map((stock) => stock.date),
    datasets: [
      {
        label: "Closing Prices",
        data: stockData.map((stock) => stock.closePrice),
        borderColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        pointRadius: 1,
        pointBackgroundColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "RSI",
        data: rsi,
        borderColor: "rgba(255, 0, 0, 0.8)",
        backgroundColor: "rgba(255, 0, 0, 0)",
        borderDash: [5, 5],
        pointRadius: 1,
        pointBackgroundColor: "rgba(255, 0, 0, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "SMA 12",
        data: [...Array(11).fill(null), ...sma12],
        borderColor: "rgba(0, 255, 0, 0.8)",
        backgroundColor: "rgba(0, 255, 0, 0)",
        pointRadius: 1,
        pointBackgroundColor: "rgba(0, 255, 0, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "SMA 20",
        data: [...Array(19).fill(null), ...sma20],
        borderColor: "rgba(0, 0, 255, 0.8)",
        backgroundColor: "rgba(0, 0, 255, 0)",
        pointRadius: 1,
        pointBackgroundColor: "rgba(0, 0, 255, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "SMA 26",
        data: [...Array(25).fill(null), ...sma26],
        borderColor: "rgba(255, 255, 0, 0.8)",
        backgroundColor: "rgba(255, 255, 0, 0)",
        pointRadius: 1,
        pointBackgroundColor: "rgba(255, 255, 0, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "MACD Line",
        data: [...Array(25).fill(null), ...macdLine],
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0)",
        pointRadius: 1,
        pointBackgroundColor: "rgba(75, 192, 192, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Signal Line",
        data: [...Array(25).fill(null), ...signalLine],
        borderColor: "rgba(153, 102, 255, 0.8)",
        backgroundColor: "rgba(153, 102, 255, 0)",
        pointRadius: 1,
        pointBackgroundColor: "rgba(153, 102, 255, 0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "MACD Histogram",
        data: [...Array(25).fill(null), ...histogram],
        type: "bar",
        backgroundColor: "rgba(255, 159, 64, 0.8)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          display: true,
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
            family: "Arial",
            weight: "bold",
          },
          usePointStyle: true,
          color: "#ffffff",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
      annotation: {
        annotations: {
          rsiBackground: {
            type: "box",
            xMin: 0,
            xMax: stockData.length - 1,
            yMin: 30,
            yMax: 70,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg p-4">
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
