export interface IStockData {
  date: string;
  volume: number;
  close_price: number;
  high_price: number;
  open_price: number;
  low_price: number;
}

export interface IStockResponse {
  stocks: {
    stock_code: string;
    market_name: string;
    stocks: IStockData[];
  };
}

export interface IStockInfoResponse {
  stockNames: {
    stock_code: string;
    stock_name: string;
  }[];
}

export interface IStock {
  code: string;
  name: string;
  market_name: string;
}

export interface IAllStocksByMarketResponse {
  all_stocks_by_market: {
    total_elements: number;
    total_pages: number;
    market_name: string;
    stocks: IStock[];
  };
}

export interface IMarket {
  name: string;
}

export interface IMarketsResponse {
  markets: {
    markets: IMarket[];
  };
}

export interface IStocksByCodeResponse {
  stocks_by_code: {
    code: string;
    total_elements: number;
    total_pages: number;
    stocks: IStock[];
  };
}

export interface IStocksByNameResponse {
  stocks_by_name: {
    total_elements: number;
    total_pages: number;
    stocks: IStock[];
  };
}
