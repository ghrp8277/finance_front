import React, { useEffect, useState } from "react";
import Tabs from "@/components/common/Tabs";
import { fetchMarketList } from "@/services/stock";
import { IMarket } from "@/types/stock";
import TabContent from "./tab/TabContent";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const MainContent: React.FC = () => {
  const [markets, setMarkets] = useState<IMarket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMarketList = async () => {
      const markets = await fetchMarketList();
      setMarkets(markets);
      setLoading(false);
    };

    loadMarketList();
  }, []);

  const tabs = markets.map((market) => ({
    label: market.name,
    content: <TabContent market={market.name} />,
  }));

  return (
    <div className="w-full">
      {loading ? <LoadingSpinner /> : <Tabs tabs={tabs} />}
    </div>
  );
};

export default MainContent;
