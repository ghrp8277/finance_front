import {
  IAllStocksByMarketResponse,
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
      results?.all_stocks_by_market ?? {
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
    const markets = results?.markets;
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
      results?.stocks_by_code ?? {
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
      results?.stocks_by_name ?? {
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
