import { useEffect, useRef, useState } from 'react';
import { getPairs } from '../services/pairs.services';

export default function useLiveData() {
  const websocketRef = useRef(null);
  const [isWebsocketOpen, setIsWebsocketOpen] = useState(false);
  const [pairsData, setPairsData] = useState({});

  useEffect(() => {
    websocketRef.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    websocketRef.current.onopen = () => setIsWebsocketOpen(true);
    websocketRef.current.onclose = () => console.log('Connection Closed');
    websocketRef.current.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.event === 'info' || data[1] === 'hb') return;

      const isSubscribeEvent = !Array.isArray(data) && data?.event === 'subscribed';

      if (isSubscribeEvent) {
        const { chanId, pair } = data;

        setPairsData((prevState) => ({
          ...prevState,
          [chanId]: {
            ...prevState[chanId],
            name: pair,
          },
        }));
      } else {
        const [
          chanId,
          [
            BID,
            BID_SIZE,
            ASK,
            ASK_SIZE,
            DAILY_CHANGE,
            DAILY_CHANGE_RELATIVE,
            LAST_PRICE,
            VOLUME,
            HIGH,
            LOW,
          ],
        ] = data;

        setPairsData((prevState) => ({
          ...prevState,
          [chanId]: {
            ...prevState[chanId],
            data: {
              LAST_PRICE,
              DAILY_CHANGE,
              DAILY_CHANGE_RELATIVE,
              HIGH,
              LOW,
            },
          },
        }));
      }
    };

    return () => {
      websocketRef.current.close();
    };
  }, []);

  const getPairsData = async () => {
    const pairs = await getPairs(5);

    pairs.forEach((pair) => {
      const symbol = `t${pair.toUpperCase()}`;

      let subscribeMessage = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol,
      });

      websocketRef.current.send(subscribeMessage);
    });
  };

  useEffect(() => {
    if (!websocketRef.current || !isWebsocketOpen || websocketRef.current.readyState !== 1) return;

    getPairsData();
  }, [isWebsocketOpen]);

  const formattedPairsData = Object.values(pairsData);

  return formattedPairsData;
}
