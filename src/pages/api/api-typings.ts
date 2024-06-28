import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import { type NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";


export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export enum AppEventEnum {
  ERROR = "error",
  LOADER = "loader",
  WEBSOCKET_EVENT = "websocket-event",
  PUBLISH_STORY = "publish_story"
}
