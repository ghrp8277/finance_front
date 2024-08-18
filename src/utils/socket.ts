import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000/sockjs";

let stompClient: Client;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
let socketConnected = false;

const subscriptions = [
  {
    destination: "/topic/error/",
    callback: (message: IMessage) => {
      console.log("Error update:", JSON.parse(message.body));
    },
  },
];

const pendingSubscriptions: {
  destination: string;
  callback: (message: any) => void;
}[] = [];
const pendingMessages: { destination: string; body: any }[] = [];
const activeSubscriptions = new Set<string>();

export const connectSocket = (onConnectCallback?: () => void): void => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
    onConnect: (frame) => {
      console.log("Connected: " + frame);
      socketConnected = true;
      reconnectAttempts = 0;

      subscribeToTopics();
      processPendingSubscriptions();
      processPendingMessages();

      if (onConnectCallback) {
        onConnectCallback();
      }
    },
    onStompError: (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
    onWebSocketClose: () => {
      console.log("Socket disconnected");
      socketConnected = false;
      attemptReconnect();
    },
  });

  stompClient.activate();
};

const attemptReconnect = (): void => {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts += 1;
    console.log(`Attempting to reconnect... (${reconnectAttempts})`);
    setTimeout(connectSocket, 1000 * reconnectAttempts);
  } else {
    console.log("Max reconnect attempts reached.");
  }
};

const subscribeToTopics = (): void => {
  subscriptions.forEach((sub) => {
    if (!activeSubscriptions.has(sub.destination)) {
      stompClient.subscribe(sub.destination, sub.callback);
      activeSubscriptions.add(sub.destination);
      console.log(`Subscribed to ${sub.destination}`);
    }
  });
};

const processPendingSubscriptions = (): void => {
  while (pendingSubscriptions.length > 0) {
    const { destination, callback } = pendingSubscriptions.shift()!;
    if (!activeSubscriptions.has(destination)) {
      stompClient.subscribe(destination, callback);
      activeSubscriptions.add(destination);
      console.log(`Subscribed to ${destination}`);
    }
  }
};

const processPendingMessages = (): void => {
  while (pendingMessages.length > 0) {
    const { destination, body } = pendingMessages.shift()!;
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(body),
    });
    console.log(`Message sent to ${destination}:`, body);
  }
};

export const disconnectSocket = (): void => {
  if (stompClient) {
    console.log("Disconnecting socket...");
    stompClient.deactivate();
    activeSubscriptions.clear();
  }
};

export const subscribeToTopic = (
  destination: string,
  callback: (message: any) => void
): void => {
  if (stompClient && stompClient.connected) {
    if (!activeSubscriptions.has(destination)) {
      stompClient.subscribe(destination, callback);
      activeSubscriptions.add(destination);
      console.log(`Subscribed to ${destination}`);
    }
  } else {
    pendingSubscriptions.push({ destination, callback });
    console.log(`Pending subscription to ${destination}`);
  }
};

export const sendMessage = (destination: string, body: any): void => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(body),
    });
    console.log(`Message sent to ${destination}:`, body);
  } else {
    pendingMessages.push({ destination, body });
    console.log(`Pending message to ${destination}:`, body);
  }
};
