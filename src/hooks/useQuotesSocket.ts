import { useEffect, useState } from "react";
import { Client} from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";

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

    const stompClient = new Client({
      webSocketFactory: () => new WebSocket("ws://localhost:8081/ws-quotes"),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      console.log("✅ Connected to WebSocket");
      stompClient.subscribe("/topic/quotes", (message: IMessage) => {
        try {
          const dto: QuoteDto = JSON.parse(message.body);
          setQuotes((prev) => ({ ...prev, [dto.symbol]: dto }));
          console.log("📈 Quote update:", dto);
        } catch (err) {
          console.error("Failed to parse quote:", err);
        }
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
