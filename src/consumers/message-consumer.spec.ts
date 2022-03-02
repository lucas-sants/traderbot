import { desiredCoinsIds } from "../constants/constants";
import { MessageConsumer } from "./message-consumer";

import * as messageUtils from "../utils/message";

describe("Message consumer", () => {
  let messageConsumer;

  const sortByDateSpy = jest.spyOn(messageUtils, "sortByDate");
  const poloniexInvalidMessageMock = ["any", "data"];

  const poloniexMessageMock = [
    1002,
    null,
    [
      240,
      "0.00627869",
      "0.00630521",
      "0.00627608",
      "0.01665689",
      "17.99294312",
      "2849.74975814",
      0,
      "0.00640264",
      "0.00615185",
      0,
      0,
    ],
  ];

  beforeEach(() => {
    messageConsumer = new MessageConsumer();
  });

  const isStoredDataEmpty = () => {
    const messageConsumerCoins = Object.keys(messageConsumer.storedData);
    messageConsumerCoins.forEach((coin: string) =>
      expect(messageConsumer.storedData[coin]).toHaveLength(0)
    );
  };

  const isStoredDataNotEmpty = () => {
    const messageConsumerCoins = Object.keys(messageConsumer.storedData);
    const coinsWithData = messageConsumerCoins.filter(
      (coin: string) => messageConsumer.storedData[coin]?.length > 0
    );
    expect(coinsWithData?.length).toBeGreaterThan(0);
  };

  describe("consume", () => {
    it("should start with no data and startedConsume flag set to false", () => {
      isStoredDataEmpty();
      expect(messageConsumer.startedConsume).toBeFalsy();
    });

    it("should not consume invalid message", () => {
      const fakePoloniexMessage = JSON.stringify(poloniexInvalidMessageMock);
      messageConsumer.consume(fakePoloniexMessage, desiredCoinsIds);
      expect(messageConsumer.startedConsume).toBeFalsy();
    });

    it("should not store data from a coin that is not on the coin to consume array", () => {
      const poloniexMessage = JSON.stringify(poloniexMessageMock);
      messageConsumer.consume(poloniexMessage, []);
      expect(messageConsumer.startedConsume).toBeTruthy();
      isStoredDataEmpty();
    });

    it("should store data from a coin that is on the coin to consume array", () => {
      const poloniexMessage = JSON.stringify(poloniexMessageMock);
      messageConsumer.consume(poloniexMessage, desiredCoinsIds);
      expect(messageConsumer.startedConsume).toBeTruthy();
      isStoredDataNotEmpty();
    });
  });

  describe("startObserverForMinutesRange", () => {
    const callbackMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should not call the sortByDate because theres no data for the coin", async () => {
      const poloniexMessage = JSON.stringify(poloniexMessageMock);
      const threeSecondsInMinute = 0.05;
      messageConsumer.startObserverForMinutesRange(threeSecondsInMinute);
      messageConsumer.consume(poloniexMessage, []);
      await new Promise((r) => setTimeout(r, 3500));
      expect(sortByDateSpy).toHaveBeenCalledTimes(0);
      isStoredDataEmpty();
    });

    it("should not call the sortByDate and dont trigger callback because theres no data inside time range", async () => {
      const poloniexMessage = JSON.stringify(poloniexMessageMock);
      const threeSecondsInMinute = 0.05;
      messageConsumer.startObserverForMinutesRange(
        threeSecondsInMinute,
        callbackMock
      );
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2020, 3, 1));
      messageConsumer.consume(poloniexMessage, desiredCoinsIds);
      jest.useRealTimers();
      await new Promise((r) => setTimeout(r, 3500));
      expect(sortByDateSpy).toHaveBeenCalledTimes(0);
      expect(callbackMock).toHaveBeenCalledTimes(0);
      isStoredDataNotEmpty();
    });

    it("should call the sortByDate and trigger callback because theres data inside time range", async () => {
      const poloniexMessage = JSON.stringify(poloniexMessageMock);
      const threeSecondsInMinute = 0.05;
      messageConsumer.startObserverForMinutesRange(
        threeSecondsInMinute,
        callbackMock
      );
      await new Promise((r) => setTimeout(r, 1000));
      messageConsumer.consume(poloniexMessage, desiredCoinsIds);
      await new Promise((r) => setTimeout(r, 2500));
      expect(callbackMock).toHaveBeenCalled();
      isStoredDataNotEmpty();
    });
  });
});
