import { getMinutesBetweenDates } from "../utils/date";
import { CoinsIds, milisecondsInAMinute } from "../constants/constants";
import { StoredMessage } from "../types/PoloniexTickerMessage";
import { parseTickerMessageFromPoloniex, sortByDate } from "../utils/message";
import { isValidMessage } from "../utils/message";
import {
  CoinDataMetricsCallback,
  GetCoinDataMetrics,
  IMessageConsumer,
} from "../types/MessageConsumer";

export class MessageConsumer implements IMessageConsumer {
  constructor() {
    this.consume = this.consume.bind(this);
    this.startObserverForMinutesRange =
      this.startObserverForMinutesRange.bind(this);
  }

  storedData: { [key: number]: StoredMessage[] } = {
    [CoinsIds.BTC]: [],
    [CoinsIds.XMR]: [],
  };
  startedConsume: boolean = false;

  async consume(data: any, coinToConsume: number[]) {
    const parsedMessage = JSON.parse(data.toString());
    if (isValidMessage(parsedMessage)) {
      if (!this.startedConsume) {
        this.startedConsume = true;
      }
      const tickerMessage = parseTickerMessageFromPoloniex(parsedMessage[2]);
      if (coinToConsume.includes(tickerMessage.currencyPairId)) {
        this.storedData[tickerMessage.currencyPairId].push({
          lastTradePrice: tickerMessage.lastTradePrice,
          time: new Date(),
        });
      }
    }
  }

  startObserverForMinutesRange(
    minutes: number,
    callback: CoinDataMetricsCallback
  ) {
    setInterval(() => {
      if (this.startedConsume) {
        const currentTime = new Date();
        const currentData = { ...this.storedData };
        Object.keys(currentData).forEach((coin: string) => {
          const currentCoinData = currentData[Number(coin)];
          if (currentCoinData?.length) {
            const dataInsideTimeRange = this.getSortedCoinDataInsideDateRange(
              currentCoinData,
              currentTime,
              minutes
            );
            if (dataInsideTimeRange?.length) {
              const { open, low, high, close } =
                this.getMetricsInsideCoinData(dataInsideTimeRange);
              const observationStartTime = new Date(currentTime);
              observationStartTime.setMinutes(observationStartTime.getMinutes() - minutes);
              callback({
                close,
                open,
                low,
                high,
                datetime: observationStartTime,
                periodicity: minutes,
                coin: CoinsIds[coin as keyof typeof CoinsIds],
              });
            }
          }
        });
      }
    }, minutes * milisecondsInAMinute);
  }

  private getSortedCoinDataInsideDateRange(
    coinData: StoredMessage[],
    time: Date,
    minutes: number
  ) {
    return coinData
      .filter((storedMessage) => {
        const minutesBetweenDates = getMinutesBetweenDates(
          storedMessage.time,
          time
        );
        return minutesBetweenDates <= minutes;
      })
      .sort((a, b) => sortByDate(a.time, b.time));
  }

  private getMetricsInsideCoinData(
    coinData: StoredMessage[]
  ): GetCoinDataMetrics {
    let open = "0";
    let low = "0";
    let high = "0";
    let close = "0";
    coinData.forEach(({ lastTradePrice }, index) => {
      if (index === 0) {
        open = lastTradePrice;
        low = lastTradePrice;
        high = lastTradePrice;
      }
      if (index === coinData.length - 1) {
        close = lastTradePrice;
      }
      if (lastTradePrice > high) {
        high = lastTradePrice;
      }
      if (lastTradePrice < low) {
        low = lastTradePrice;
      }
    });
    return { open, low, high, close };
  }
}
