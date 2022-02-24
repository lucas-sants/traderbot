export type PoloniexTickerMessage = {
  currencyPairId: number;
  lastTradePrice: string;
  lowestAsk: string;
  highestBid: string;
  percentChangeInLast24Hours: string;
  baseCurrentVolumeInLast24Hours: string;
  quoteCurrencyVolumeInLast24Hours: string;
  isFrozen: boolean;
  highestTradePriceInLast24Hours: string;
  lowestTradePriceInLast24Hours: string;
  postOnly: boolean;
  maintenanceMode: boolean;
};

export type StoredMessage = {
  lastTradePrice: string;
  time: Date;
};
