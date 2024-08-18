import { useNavigate } from "@/hooks/useNavigate";
import React, { useEffect, useState } from "react";
import { Chart } from "@/components/index";
import { v4 as uuidv4 } from "uuid";
import { useSockJS } from "@/hooks/useSockJS";
import constants from "@/constants";
import PostList from "@/components/social/postForm/PostList";

const ChartPage: React.FC = () => {
  const { getQueryParams } = useNavigate();
  const { market, code, name } = getQueryParams();
  const uniqueId = uuidv4();
  const { subscribe, send } = useSockJS();
  const [stockData, setStockData] = useState([]);
  const [rsi, setRsi] = useState([]);
  const [sma12, setSma12] = useState([]);
  const [sma20, setSma20] = useState([]);
  const [sma26, setSma26] = useState([]);
  const [macdLine, setMacdLine] = useState([]);
  const [signalLine, setSignalLine] = useState([]);
  const [histogram, setHistogram] = useState([]);
  const [timeframe, setTimeframe] = useState(
    constants.STOCK_DATA_TIME["1MONTH"]
  );
  const [selectedTimeframe, setSelectedTimeframe] = useState("1MONTH");

  useEffect(() => {
    const fetchData = async () => {
      subscribe(
        `/topic/initialData/${market}/${code}/${uniqueId}`,
        (message) => {
          const stockData = JSON.parse(message.body);
          setRsi(stockData.rsi.rsi);
          setSma12(stockData.movingAverages.sma12);
          setSma20(stockData.movingAverages.sma20);
          setSma26(stockData.movingAverages.sma26);
          setMacdLine(stockData.macd.macdLine);
          setSignalLine(stockData.macd.signalLine);
          setHistogram(stockData.macd.histogram);
          setStockData(stockData.stockData);
        }
      );

      send(`/app/initialData/${market}/${code}/${uniqueId}`, {
        timeframe: timeframe,
      });
    };

    if (market && code && name) {
      fetchData();
    }
  }, [market, code, name, subscribe, send, timeframe]);

  const handleTimeframeChange = (
    newTimeframe: string,
    timeframeKey: string
  ) => {
    setTimeframe(newTimeframe);
    setSelectedTimeframe(timeframeKey);
  };

  const getButtonClass = (timeframeKey: string) => {
    return selectedTimeframe === timeframeKey
      ? "bg-[#44D62C] rounded px-4 py-1 text-black"
      : "text-green-500 hover:bg-[#2A2A2A] hover:text-[#44D62C]";
  };

  const latestClosePrice =
    stockData.length > 0
      ? (stockData[stockData.length - 1] as any).closePrice
      : constants.DEFAULT_NUM;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="min-h-screen py-[60px] flex items-center justify-center text-green-500">
      <div className="w-full max-w-5xl p-8 border border-green-500 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-2 bg-gray-800 text-green-500 rounded-full px-4 py-1">
            {name}
          </h1>
          <h1 className="text-2xl mb-2 border border-green-500 text-green-500 rounded-full px-4 py-1">
            {market}
          </h1>
        </div>
        <h2 className="text-3xl font-bold mb-4">
          {latestClosePrice !== null ? `${formatPrice(latestClosePrice)}` : ""}
          <span className="text-sm"> 원</span>
        </h2>

        <Chart
          stockData={stockData}
          rsi={rsi}
          sma12={sma12}
          sma20={sma20}
          sma26={sma26}
          macdLine={macdLine}
          signalLine={signalLine}
          histogram={histogram}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              handleTimeframeChange(
                constants.STOCK_DATA_TIME["1MONTH"],
                "1MONTH"
              )
            }
            className={getButtonClass("1MONTH")}
          >
            1개월
          </button>
          <button
            onClick={() =>
              handleTimeframeChange(constants.STOCK_DATA_TIME["1YEAR"], "1YEAR")
            }
            className={getButtonClass("1YEAR")}
          >
            1년
          </button>
          <button
            onClick={() =>
              handleTimeframeChange(
                constants.STOCK_DATA_TIME["3YEARS"],
                "3YEARS"
              )
            }
            className={getButtonClass("3YEARS")}
          >
            3년
          </button>
          <button
            onClick={() =>
              handleTimeframeChange(
                constants.STOCK_DATA_TIME["5YEARS"],
                "5YEARS"
              )
            }
            className={getButtonClass("5YEARS")}
          >
            5년
          </button>
        </div>
        <hr className="my-8 border-gray-600" />
        <div>
          <PostList market={market} code={code} name={name} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
