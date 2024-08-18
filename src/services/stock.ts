import { get } from "@/api";
import { IPaging } from "@/types/common";
import {
  IStockData,
  IStockResponse,
  IAllStocksByMarketResponse,
  IMarketsResponse,
  IStocksByNameResponse,
  IStocksByCodeResponse,
} from "@/types/stock";
import constants from "@/constants";
import {
  getStockListModel,
  getMarketListModel,
  getStocksByNameModel,
  getStocksByCodeModel,
} from "@/models/stock";

const STOCK_URL = "stock";

export const fetchStockList = async (
  market: string,
  paging: IPaging = {
    page: constants.DEFAULT_PAGING.PAGE,
    pageSize: constants.DEFAULT_PAGING.PAGESIZE,
  },
  sort: string = "name,asc"
) => {
  const response = await get<IAllStocksByMarketResponse>(
    `${STOCK_URL}/markets/${market}/securities?page=${paging.page}&pageSize=${paging.pageSize}&sort=${sort}`
  );

  return getStockListModel(response);
};

export const fetchMarketList = async () => {
  const response = await get<IMarketsResponse>(`${STOCK_URL}/markets`);
  return getMarketListModel(response);
};

export const fetchSearchStockName = async (data: {
  term: string;
  page?: number;
}) => {
  const { term, page = 0 } = data;

  const encodedTerm = encodeURIComponent(term);

  const response = await get<IStocksByNameResponse>(
    `${STOCK_URL}/securities/search/name?page=${page}&pageSize=10&sort=name,asc&name=${encodedTerm}`
  );
  return getStocksByNameModel(response);
};

export const fetchSearchStockCode = async (data: {
  term: string;
  page?: number;
}) => {
  const { term, page = 0 } = data;

  const encodedTerm = encodeURIComponent(term);

  const response = await get<IStocksByCodeResponse>(
    `${STOCK_URL}/securities/search/code?page=${page}&pageSize=10&sort=name,asc&code=${encodedTerm}`
  );
  return getStocksByCodeModel(response);
};

export const parseStockData = (data: any): IStockResponse => {
  const parsedStocks: IStockData[] = data.stockData.map((item: any) => ({
    date: item.date,
    volume: item.volume,
    close_price: item.closePrice,
    high_price: item.highPrice,
    open_price: item.openPrice,
    low_price: item.lowPrice,
  }));

  return {
    stocks: {
      stock_code: data.code,
      market_name: data.marketName,
      stocks: parsedStocks,
    },
  };
};
