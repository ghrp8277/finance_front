declare module "sockjs" {
  import { Server as HttpServer } from "http";

  interface Connection extends NodeJS.EventEmitter {
    send(data: string): void;
    close(code?: number, reason?: string): void;
    on(event: "data", listener: (message: string) => void): this;
    on(event: "close", listener: () => void): this;
  }

  interface ServerOptions {
    prefix?: string;
    sockjs_url?: string;
    websocket?: boolean;
    jsessionid?: boolean;
    log?: (severity: string, message: string) => void;
    heartbeat_delay?: number;
    disconnect_delay?: number;
  }

  class Server {
    constructor(options?: ServerOptions);
    on(event: "connection", listener: (conn: Connection) => void): this;
    on(event: "close", listener: () => void): this;
    installHandlers(server: HttpServer, options?: ServerOptions): void;
  }

  function createServer(options?: ServerOptions): Server;
}
