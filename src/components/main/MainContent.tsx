import React, { useEffect, useState } from "react";
import Tabs from "@/components/common/Tabs";
import { fetchMarketList } from "@/services/stock";
import { IMarket } from "@/types/stock";
import TabContent from "./tab/TabContent";

const MainContent: React.FC = () => {
  const [markets, setMarkets] = useState<IMarket[]>([]);

  useEffect(() => {
    const loadMarketList = async () => {
      const markets = await fetchMarketList();
      setMarkets(markets);
    };

    loadMarketList();
  }, []);

  const tabs = markets.map((market) => ({
    label: market.name,
    content: <TabContent market={market.name} />,
  }));

  return (
    <div className="w-full">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MainContent;
