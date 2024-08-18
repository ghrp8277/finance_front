import { useState, useCallback } from "react";
import { fetchSearchStockName, fetchSearchStockCode } from "@/services/stock";
import useDebounce from "@/hooks/useDebounced";

const useSearchStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [searchResults, setSearchResults] = useState<
    { code: string; name: string; market_name: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const performSearch = useCallback(
    async (term: string) => {
      setModalPage(0);

      const fetchStock =
        searchCategory === "name" ? fetchSearchStockName : fetchSearchStockCode;

      const results = await fetchStock({
        term,
        page: 0,
      });

      if (results && results.stocks) {
        setSearchResults(
          results.stocks.map((result: any) => ({
            code: result.code,
            name: result.name,
            market_name: result.market_name,
          }))
        );
        setIsModalOpen(true);
        setModalPage(1);
        setHasMoreResults(results.stocks.length > 0);
      } else {
        setSearchResults([]);
        setIsModalOpen(true);
        setHasMoreResults(false);
      }
    },
    [searchCategory]
  );

  const debouncedSearch = useDebounce(performSearch, 1000);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMoreResults) return;
    setIsLoadingMore(true);

    const fetchStock =
      searchCategory === "name" ? fetchSearchStockName : fetchSearchStockCode;

    try {
      const results = await fetchStock({
        term: searchTerm,
        page: modalPage,
      });

      if (results && results.stocks) {
        const newResults = results.stocks.map((result: any) => ({
          code: result.code,
          name: result.name,
          market_name: result.market_name,
        }));

        setSearchResults((prevResults) => {
          const updatedResults = [...prevResults, ...newResults];
          return updatedResults.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.code === item.code && t.market_name === item.market_name
              )
          );
        });

        setModalPage(modalPage + 1);
        setHasMoreResults(newResults.length > 0);
      } else {
        setHasMoreResults(false);
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [searchTerm, searchCategory, modalPage, isLoadingMore, hasMoreResults]);

  return {
    searchTerm,
    setSearchTerm,
    searchCategory,
    setSearchCategory,
    searchResults,
    isModalOpen,
    setIsModalOpen,
    debouncedSearch,
    loadMore,
  };
};

export default useSearchStock;
