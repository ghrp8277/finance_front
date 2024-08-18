import { useEffect, useCallback } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeToTopic,
  sendMessage,
} from "@/utils/socket";

interface UseSockJSReturn {
  connect: () => void;
  disconnect: () => void;
  subscribe: (destination: string, callback: (message: any) => void) => void;
  send: (destination: string, body: any) => void;
}

export const useSockJS = (): UseSockJSReturn => {
  const connect = useCallback(() => {
    connectSocket();
  }, []);

  const disconnect = useCallback(() => {
    disconnectSocket();
  }, []);

  const subscribe = useCallback(
    (destination: string, callback: (message: any) => void) => {
      subscribeToTopic(destination, callback);
    },
    []
  );

  const send = useCallback((destination: string, body: any) => {
    sendMessage(destination, body);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { connect, disconnect, subscribe, send };
};
