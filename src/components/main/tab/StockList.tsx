import React, { useEffect, useState } from "react";
import { fetchStockList } from "@/services/stock";
import { IStock } from "@/types/stock";
import { useNavigate } from "@/hooks/useNavigate";
import { Card } from "@/components/index";
import LoadingSpinner from "@/components/common/LoadingSpinner";

type StockListProps = {
  market: string;
  currentPage: number;
  pageSize: number;
  sortOption: string;
  onTotalPagesChange: (totalPages: number) => void;
};

const StockList: React.FC<StockListProps> = ({
  market,
  currentPage,
  pageSize,
  sortOption,
  onTotalPagesChange,
}) => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // 추가된 상태
  const { navigateToStockDetail } = useNavigate();

  useEffect(() => {
    const loadStockList = async () => {
      setLoading(true);
      const { stocks, total_pages } = await fetchStockList(
        market,
        {
          page: currentPage,
          pageSize,
        },
        sortOption
      );
      setStocks(stocks);
      onTotalPagesChange(total_pages);
      setLoading(false);
    };

    loadStockList();
  }, [market, currentPage, pageSize, sortOption]);

  const handleCardClick = (stock: IStock) => {
    navigateToStockDetail({
      market: stock.market_name,
      code: stock.code,
      name: stock.name,
    });
  };

  return (
    <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        <LoadingSpinner />
      ) : stocks.length > 0 ? (
        stocks.map((stock) => (
          <Card
            key={stock.code}
            title={stock.name}
            onClick={() => handleCardClick(stock)}
          />
        ))
      ) : (
        <p>No stocks available for {market}.</p>
      )}
    </div>
  );
};

export default StockList;
