import { useState, ReactNode } from "react";
import EmptyValue from "./EmptyValue";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) {
    return (
      <div className="text-green-500">
        <EmptyValue placeholder="탭이 존재하지 않습니다." />
      </div>
    );
  }

  const currentTab = tabs[activeTab];

  return (
    <div className="text-green-500">
      <div className="flex justify-center items-center mb-4 space-x-8">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer px-4 py-2 transition-all duration-300 ${
              index === activeTab
                ? "font-bold text-green-500 border-b-2 border-green-500"
                : "text-gray-500 border-b-2 border-transparent hover:text-green-300"
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div
        className="p-4 border-t rounded-b-lg"
        style={{ borderColor: "#44D62C" }}
      >
        {currentTab.content ? (
          currentTab.content
        ) : (
          <EmptyValue placeholder="데이터가 비어있습니다." />
        )}
      </div>
    </div>
  );
};

export default Tabs;
