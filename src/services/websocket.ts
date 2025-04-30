import { useEffect, useRef, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  data: any;
}

export const useWebSocket = (url: string | undefined, onMessage: (data: any) => void) => {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (!url) {
      console.warn('WebSocket URL not provided, real-time updates disabled');
      return;
    }

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket Connected');
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          if (message.type === 'transaction_update') {
            onMessage(message.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket Disconnected');
        // Attempt to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
    }
  }, [url, onMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { sendMessage };
}; 