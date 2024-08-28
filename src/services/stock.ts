import { get, post, del } from "@/api";
import { IPaging } from "@/types/common";
import {
  IAllStocksByMarketResponse,
  IMarketsResponse,
  IStocksByNameResponse,
  IStocksByCodeResponse,
  IGetFavorites,
  IAddFavorites,
} from "@/types/stock";
import constants from "@/constants";
import {
  getStockListModel,
  getMarketListModel,
  getStocksByNameModel,
  getStocksByCodeModel,
  getFavoritesModel,
  getAddFavoritesModel,
  getDelFavoritesModel,
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

export const fetchGetFavorites = async (
  paging: IPaging = {
    page: constants.DEFAULT_PAGING.PAGE,
    pageSize: constants.DEFAULT_PAGING.PAGESIZE,
  }
) => {
  const response = await get<IGetFavorites>(
    `${STOCK_URL}/favorites?page=${paging.page}&pageSize=${paging.pageSize}`,
    undefined,
    true
  );
  return getFavoritesModel(response);
};

export const fetchAddFavorites = async (userId: number, code: string) => {
  const response = await post<IAddFavorites>(`${STOCK_URL}/favorites`, {
    userId,
    stockCode: code,
  });
  return getAddFavoritesModel(response);
};

export const fetchDelFavorites = async (userId: number, code: string) => {
  const response = await del(`${STOCK_URL}/favorites`, {
    userId,
    stockCode: code,
  });
  return getDelFavoritesModel(response);
};
