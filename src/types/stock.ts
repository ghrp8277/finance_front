export interface IStockData {
  date: string;
  volume: number;
  close_price: number;
  high_price: number;
  open_price: number;
  low_price: number;
}

export interface IStockResponse {
  results: {
    stock_code: string;
    market_name: string;
    stocks: IStockData[];
  };
}

export interface IStockInfoResponse {
  results: {
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
  results: {
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
  results: {
    markets: IMarket[];
  };
}

export interface IStocksByCodeResponse {
  results: {
    code: string;
    total_elements: number;
    total_pages: number;
    stocks: IStock[];
  };
}

export interface IStocksByNameResponse {
  results: {
    total_elements: number;
    total_pages: number;
    stocks: IStock[];
  };
}

export interface IFavorit {
  market: string;
  name: string;
  code: string;
}

export interface IGetFavorites {
  results: {
    favorites: IFavorit[];
  };
}

export interface IAddFavorites {
  results: {
    market: string;
    name: string;
    code: string;
  };
}

export interface IDelFavorites {
  results: {
    market: string;
    name: string;
    code: string;
  };
}
