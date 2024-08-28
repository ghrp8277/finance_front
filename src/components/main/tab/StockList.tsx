import React, { useEffect, useState } from "react";
import { fetchStockList, fetchAddFavorites } from "@/services/stock";
import { IStock } from "@/types/stock";
import { useNavigate } from "@/hooks/useNavigate";
import { Card } from "@/components/index";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useStorage } from "@/hooks/useStorage";
import { useFavoriteStore } from "@/stores";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { navigateToStockDetail } = useNavigate();
  const { user, isLoggedIn } = useStorage();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

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

  const toggleFavorite = async (stock: IStock) => {
    if (user) {
      if (favorites.some((fav) => fav.code === stock.code)) {
        removeFavorite(stock.code);
      } else {
        addFavorite({
          code: stock.code,
          market: stock.market_name,
          name: stock.name,
        });
        await fetchAddFavorites(user.id, stock.code);
      }
    }
  };

  const isFavorite = (stockCode: string) =>
    favorites.some((fav) => fav.code === stockCode);

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
          >
            {isLoggedIn && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(stock);
                }}
                className="ml-auto bg-transparent border-none cursor-pointer"
              >
                {isFavorite(stock.code) ? (
                  <svg
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-500 hover:text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                )}
              </button>
            )}
          </Card>
        ))
      ) : (
        <p>No stocks available for {market}.</p>
      )}
    </div>
  );
};

export default StockList;
