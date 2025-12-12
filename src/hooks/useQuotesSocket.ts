import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export interface QuoteDto {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface QuotesMap {
  [symbol: string]: QuoteDto;
}

export default function useQuotesSocket() {
  const [quotes, setQuotes] = useState<QuotesMap>({});

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.warn("⚠️ No JWT token found, skipping WebSocket connection");
      return;
    }

    const socket = new SockJS("http://localhost:8091/ws-quotes");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log("✅ Connected to WebSocket");
      stompClient.subscribe("/topic/quotes", (message) => {
        const dto: QuoteDto = JSON.parse(message.body);
        setQuotes((prev) => ({ ...prev, [dto.symbol]: dto }));
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ STOMP error:", frame.headers["message"], frame.body);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return quotes;
}
