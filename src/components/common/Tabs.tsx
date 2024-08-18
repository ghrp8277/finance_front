import { useState, ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

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
        {currentTab ? currentTab.content : <p>No content available</p>}
      </div>
    </div>
  );
};

export default Tabs;
