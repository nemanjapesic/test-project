import { useEffect, useRef, useState } from 'react';
import { getPairs } from '../services/pairs.services';

const PAIRS_LIMIT = 5;

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
        const [chanId, [, , , , dailyChange, dailyChangeRelative, lastPrice, , high, low]] = data;

        setPairsData((prevState) => ({
          ...prevState,
          [chanId]: {
            ...prevState[chanId],
            lastPrice,
            dailyChange,
            dailyChangeRelative,
            high,
            low,
          },
        }));
      }
    };

    return () => {
      websocketRef.current.close();
    };
  }, []);

  const getPairsData = async () => {
    const pairs = await getPairs(PAIRS_LIMIT);

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

  if (formattedPairsData.length < PAIRS_LIMIT) return [];

  return formattedPairsData;
}
