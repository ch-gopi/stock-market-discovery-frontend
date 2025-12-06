// src/components/Chart/index.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export function Chart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`/api/v1/historical/${symbol}?interval=1m&from=2025-12-01&to=2025-12-06`)
      .then((res) => setData(res.data));
  }, [symbol]);

  return (
    <LineChart width={400} height={200} data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="close" stroke="#8884d8" />
    </LineChart>
  );
}
