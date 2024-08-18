import { ChartConfiguration } from "chart.js";

export const getChartConfig = (
  labels: string[],
  closingPrices: number[],
  volumes: number[],
  ma5: (number | null)[],
  ma20: (number | null)[],
  ma60: (number | null)[],
  ma120: (number | null)[]
): ChartConfiguration => {
  return {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Closing Prices",
          data: closingPrices,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          yAxisID: "y",
        },
        {
          label: "MA5",
          data: ma5,
          borderColor: "red",
          fill: false,
          yAxisID: "y",
        },
        {
          label: "MA20",
          data: ma20,
          borderColor: "green",
          fill: false,
          yAxisID: "y",
        },
        {
          label: "MA60",
          data: ma60,
          borderColor: "orange",
          fill: false,
          yAxisID: "y",
        },
        {
          label: "MA120",
          data: ma120,
          borderColor: "purple",
          fill: false,
          yAxisID: "y",
        },
        {
          label: "Volume",
          data: volumes,
          type: "bar",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          yAxisID: "y1",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          position: "left",
          title: {
            display: true,
            text: "Price",
          },
        },
        y1: {
          beginAtZero: true,
          position: "right",
          title: {
            display: true,
            text: "Volume",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: "box",
              xMin: 0,
              xMax: labels.length - 1,
              yMin: Math.min(...closingPrices),
              yMax: Math.max(...closingPrices),
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            },
          },
        },
      },
      backgroundColor: "white",
    },
  };
};
