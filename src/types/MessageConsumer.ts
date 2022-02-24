import { CoinsIds } from "../constants/constants";

export type GetCoinDataMetrics = {
  open: string;
  low: string;
  high: string;
  close: string;
};

type ExternalCoinDataMetrics = {
  datetime: Date;
  periodicity: number;
  coin: CoinsIds;
};

export type CoinDataMetrics = GetCoinDataMetrics & ExternalCoinDataMetrics;

export type CoinDataMetricsCallback = (metrics: CoinDataMetrics) => any;

export interface IMessageConsumer {
  consume(data: any, coinToConsume: number[]): void;
  startObserverForMinutesRange(
    minutes: number,
    callback: CoinDataMetricsCallback
  ): void;
}
