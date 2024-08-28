import React, { useEffect, useState } from "react";
import Tabs from "@/components/common/Tabs";
import { fetchMarketList, fetchGetFavorites } from "@/services/stock";
import { useStorage } from "@/hooks/useStorage";
import { IFavorit, IMarket } from "@/types/stock";
import TabContent from "./tab/TabContent";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Favorites from "./Favorites";
import { useFavoriteStore } from "@/stores";

const MainContent: React.FC = () => {
  const [markets, setMarkets] = useState<IMarket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoggedIn } = useStorage();
  const { setFavorites } = useFavoriteStore();

  useEffect(() => {
    const loadMarketList = async () => {
      setLoading(true);

      const markets = await fetchMarketList();
      setMarkets(markets);

      if (isLoggedIn) {
        const responseGetFavorites = await fetchGetFavorites();
        setFavorites(responseGetFavorites.favorites);
      }

      setLoading(false);
    };

    if (isLoggedIn !== null) {
      loadMarketList();
    }
  }, [isLoggedIn, setFavorites]);

  const tabs = markets.map((market) => ({
    label: market.name,
    content: <TabContent market={market.name} />,
  }));

  return (
    <div className="w-full">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex min-w-full">
          <div className="flex-1">
            <Tabs tabs={tabs} />
          </div>
          {isLoggedIn && (
            <div className="min-w-[200px]">
              <Favorites />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;
