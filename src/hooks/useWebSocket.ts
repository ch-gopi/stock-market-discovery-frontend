import { useEffect } from 'react';
export function useWebSocket(url: string, onMsg: (msg:any)=>void) {
  useEffect(()=>{
    const socket = new WebSocket(url);
    socket.onmessage = e => onMsg(JSON.parse(e.data));
    return ()=> socket.close();
  },[url]);
}
