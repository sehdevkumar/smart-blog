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
  PUBLISH_STORY = "publish_story",
  SELECT_POST = 'selected_post'
}

export interface UserType {
  id: number;
  email: string;
  name: string;
  iat: number; // Issued At Time (in seconds since Epoch)
  exp: number; // Expiration Time (in seconds since Epoch)
}



export interface BlogPost {
  authorId: number;
  content: string;
  createdAt: Date;
  id: number;
  published: boolean;
  title: string | null;
  updatedAt: Date;
  name?:string;
}


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  posts: BlogPost[];
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
