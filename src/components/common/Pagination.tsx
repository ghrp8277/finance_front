import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  pageRangeDisplayed?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  pageRangeDisplayed = 5,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => onPageChange(page);

  const renderPageNumbers = () => {
    const pages = [];
    const halfRange = Math.floor(pageRangeDisplayed / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (endPage - startPage + 1 < pageRangeDisplayed) {
      if (startPage === 1) {
        endPage = Math.min(
          totalPages,
          endPage + (pageRangeDisplayed - (endPage - startPage + 1))
        );
      } else {
        startPage = Math.max(
          1,
          startPage - (pageRangeDisplayed - (endPage - startPage + 1))
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            i === currentPage
              ? "bg-green-500 text-black animate-pulse"
              : "bg-transparent text-green-500 hover:bg-green-700 hover:text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center items-center space-x-2 text-green-500 p-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-green-700 rounded disabled:text-gray-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-green-700 rounded disabled:text-gray-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
      {onPageSizeChange && (
        <div className="mt-2">
          <select
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="p-2 border rounded bg-gray-900 text-green-500 focus:outline-none"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
