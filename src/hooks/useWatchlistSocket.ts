// src/hooks/useWatchlistSocket.ts
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";


export interface WatchlistItem {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

export function useWatchlistSocket(userId: number) {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("jwt");

    const client = new Client({
      // SockJS endpoint exposed by your backend
      webSocketFactory: () => new WebSocket("http://localhost:8081/ws-watchlist"),
      // Send JWT in STOMP CONNECT frame headers
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      reconnectDelay: 5000, // auto-reconnect after 5s
      debug: (str) => {
        // optional: log STOMP activity for debugging
        console.log(str);
      },
    });

    client.onConnect = () => {
      // Subscribe to user-specific topic
      client.subscribe(`/topic/watchlist/${userId}`, (msg: IMessage) => {
        try {
          const updatedItems: WatchlistItem[] = JSON.parse(msg.body);
          setItems(updatedItems);
        } catch (err) {
          console.error("Failed to parse watchlist update:", err);
        }
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [userId]);

  return items;
}
