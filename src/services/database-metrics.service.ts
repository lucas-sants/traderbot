import { Metrics } from "../database/metrics.model";
import { CoinDataMetrics } from "../types/MessageConsumer";

export class DatabaseMetricsService {
  async saveMetricsToDabatase(metrics: CoinDataMetrics): Promise<Metrics> {
    return Metrics.query().insert({
      close: metrics.close,
      high: metrics.high,
      low: metrics.low,
      open: metrics.open,
      periodicity: metrics.periodicity,
      coin: metrics.coin.toString(),
      datetime: metrics.datetime,
    });
  }
}
