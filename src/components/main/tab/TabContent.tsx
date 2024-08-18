import React, { useState } from "react";
import Pagination from "@/components/common/Pagination";
import StockList from "@/components/main/tab/StockList";
import constants from "@/constants";
import SearchSection from "@/components/main/tab/SearchSection";
import SelectBox from "@/components/common/SelectBox";

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [stockListPage, setStockListPage] = useState(
    constants.DEFAULT_PAGING.PAGE
  );
  const [totalStockListPages, setTotalStockListPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState("code");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortOption = `${sortField},${sortOrder}`;

  const sortFieldOptions = [
    { label: "이름", value: "name" },
    { label: "코드", value: "code" },
  ];

  const sortOrderOptions = [
    { label: "오름차순", value: "asc" },
    { label: "내림차순", value: "desc" },
  ];

  const handlePageChange = (page: number) => {
    setStockListPage(page - 1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setStockListPage(0);
  };

  const handleSortFieldChange = (field: string) => {
    setSortField(field);
    setStockListPage(0);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    setStockListPage(0);
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-center mb-6 relative">
        <SearchSection />
      </div>
      <div className="flex justify-start mb-6 space-x-2 relative left-[150px]">
        <SelectBox
          options={sortFieldOptions}
          selectedValue={sortField}
          onChange={handleSortFieldChange}
          label="필드"
        />
        <SelectBox
          options={sortOrderOptions}
          selectedValue={sortOrder}
          onChange={handleSortOrderChange}
          label="정렬"
        />
      </div>
      <StockList
        market={market}
        currentPage={stockListPage}
        pageSize={pageSize}
        sortOption={sortOption}
        onTotalPagesChange={(totalPages: number) =>
          setTotalStockListPages(totalPages)
        }
      />
      <Pagination
        currentPage={stockListPage + 1}
        totalPages={totalStockListPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageRangeDisplayed={5}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default TabContent;
