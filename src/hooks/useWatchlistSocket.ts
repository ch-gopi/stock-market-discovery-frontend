import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export function useWatchlistSocket(userId: number) {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8081/ws-watchlist"),
    });

    client.onConnect = () => {
      client.subscribe(`/topic/watchlist/${userId}`, (msg) => {
        const updatedItems: WatchlistItem[] = JSON.parse(msg.body);
        setItems(updatedItems);
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [userId]);

  return items;
}
