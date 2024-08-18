declare module "sockjs-client" {
  export interface SockJSOptions {
    server?: string;
    sessionId?: number | (() => string);
    transports?: string[];
  }

  export default class SockJS {
    constructor(url: string, options?: SockJSOptions);

    onopen: (e: Event) => void;
    onmessage: (e: MessageEvent) => void;
    onclose: (e: CloseEvent) => void;

    close(code?: number, reason?: string): void;
    send(data: string): void;
  }
}
