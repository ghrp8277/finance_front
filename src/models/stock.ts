import {
  IAddFavorites,
  IAllStocksByMarketResponse,
  IDelFavorites,
  IGetFavorites,
  IMarketsResponse,
  IStocksByCodeResponse,
  IStocksByNameResponse,
} from "@/types/stock";
import constants from "@/constants";
import { IApiResponse } from "@/types/common";

export const getStockListModel = (
  res: IApiResponse<IAllStocksByMarketResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res?.data;

    return (
      results?.results ?? {
        market_name: constants.NONE,
        stocks: constants.DEFAULT_ITEMS,
        total_elements: constants.DEFAULT_NUM,
        total_pages: constants.DEFAULT_NUM,
      }
    );
  }

  return {
    market_name: constants.NONE,
    stocks: constants.DEFAULT_ITEMS,
    total_elements: constants.DEFAULT_NUM,
    total_pages: constants.DEFAULT_NUM,
  };
};

export const getMarketListModel = (res: IApiResponse<IMarketsResponse>) => {
  const success = res.success;

  if (success) {
    const results = res?.data;
    const markets = results?.results;
    return markets?.markets ?? constants.DEFAULT_ITEMS;
  }

  return constants.DEFAULT_ITEMS;
};

export const getStocksByCodeModel = (
  res: IApiResponse<IStocksByCodeResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res?.data;

    return (
      results?.results ?? {
        code: constants.NONE,
        total_elements: constants.DEFAULT_NUM,
        total_pages: constants.DEFAULT_NUM,
        stocks: constants.DEFAULT_ITEMS,
      }
    );
  }

  return {
    code: constants.NONE,
    total_elements: constants.DEFAULT_NUM,
    total_pages: constants.DEFAULT_NUM,
    stocks: constants.DEFAULT_ITEMS,
  };
};

export const getStocksByNameModel = (
  res: IApiResponse<IStocksByNameResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res?.data;

    return (
      results?.results ?? {
        total_elements: constants.DEFAULT_NUM,
        total_pages: constants.DEFAULT_NUM,
        stocks: constants.DEFAULT_ITEMS,
      }
    );
  }

  return {
    total_elements: constants.DEFAULT_NUM,
    total_pages: constants.DEFAULT_NUM,
    stocks: constants.DEFAULT_ITEMS,
  };
};

export const getFavoritesModel = (res: IApiResponse<IGetFavorites>) => {
  const success = res.success;

  if (success) {
    const data = res?.data;

    return {
      favorites: data?.results.favorites ?? constants.DEFAULT_ITEMS,
    };
  }

  return {
    favorites: constants.DEFAULT_ITEMS,
  };
};

export const getAddFavoritesModel = (res: IApiResponse<IAddFavorites>) => {
  const success = res.success;

  if (success) {
    const data = res?.data;

    return {
      code: data?.results.code ?? constants.DEFAULT_STR,
      name: data?.results.name ?? constants.DEFAULT_STR,
      market: data?.results.market ?? constants.DEFAULT_STR,
    };
  }

  return {
    code: constants.DEFAULT_STR,
    name: constants.DEFAULT_STR,
    market: constants.DEFAULT_STR,
  };
};

export const getDelFavoritesModel = (res: IApiResponse<any>) => {
  const success = res.success;

  if (success) {
    const data = res?.data;

    return {
      code: data?.results.code ?? constants.DEFAULT_STR,
      name: data?.results.name ?? constants.DEFAULT_STR,
      market: data?.results.market ?? constants.DEFAULT_STR,
      success,
    };
  }

  return {
    code: constants.DEFAULT_STR,
    name: constants.DEFAULT_STR,
    market: constants.DEFAULT_STR,
    success,
  };
};
