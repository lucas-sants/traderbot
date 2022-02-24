import { CoinsIds } from "../constants/constants";
import { PoloniexTickerMessage } from "../types/PoloniexTickerMessage";

export const parseTickerMessageFromPoloniex = (
  message: any[]
): PoloniexTickerMessage => {
  const [
    currencyPairId,
    lastTradePrice,
    lowestAsk,
    highestBid,
    percentChangeInLast24Hours,
    baseCurrentVolumeInLast24Hours,
    quoteCurrencyVolumeInLast24Hours,
    isFrozen,
    highestTradePriceInLast24Hours,
    lowestTradePriceInLast24Hours,
    postOnly,
    maintenanceMode,
  ] = message;
  return {
    currencyPairId,
    lastTradePrice,
    lowestAsk,
    highestBid,
    percentChangeInLast24Hours,
    baseCurrentVolumeInLast24Hours,
    quoteCurrencyVolumeInLast24Hours,
    isFrozen: !!isFrozen,
    highestTradePriceInLast24Hours,
    lowestTradePriceInLast24Hours,
    postOnly: !!postOnly,
    maintenanceMode: !!maintenanceMode,
  };
};

export const isValidMessage = (message: any[]) => message.length > 2;

export const sortByDate = (a: Date, b: Date) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};
