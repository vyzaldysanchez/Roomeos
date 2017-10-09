import * as socketIO from "socket.io";
import { Server } from "http";
import { RoomMessageModel } from "../models/RoomMessage";

export class MessagingServer {
  private io: any;

  constructor(private httpServer: Server) {
    this.sockets();
  }

  private sockets(): void {
    this.io = socketIO();
  }

  public listen(): void {
    this.io.listen(this.httpServer);
    console.log("Messaging server listening");

    this.io.on("connect", (socket: any) => {

      console.log("client connected");

      socket.on("message", (m: RoomMessageModel) => {
        console.log("[server](message): %s", JSON.stringify(m));
        this.io.emit("message", m);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

  }
}