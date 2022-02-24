import WebSocket from "ws";
import { desiredCoinsIds } from "./constants/constants";
import { MessageConsumer } from "./consumers/message-consumer";
import { DatabaseMetricsService } from "./services/database-metrics.service";
import { CoinDataMetrics } from "./types/MessageConsumer";

import dotenv from "dotenv";

if (process.env.NODE_ENV === "dev") {
  dotenv.config({
    path: ".env",
  });
}

import "./database/configure";

try {
  const ws = new WebSocket("wss://api2.poloniex.com");
  const consumer = new MessageConsumer();
  const databaseMetricsService = new DatabaseMetricsService();

  ws.on("open", () => {
    ws.send(JSON.stringify({ command: "subscribe", channel: 1002 }));
  });

  ws.on("message", (data) => {
    consumer.consume(data, desiredCoinsIds);
  });

  consumer.startObserverForMinutesRange(
    0.1,
    async (metrics: CoinDataMetrics) => {
      await databaseMetricsService.saveMetricsToDabatase(metrics);
    }
  );
} catch (err) {
  throw err;
}
