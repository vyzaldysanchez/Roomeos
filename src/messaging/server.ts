import * as socketIO from "socket.io";
import { Server } from "http";
import handleMessageEvents from "./messaging-events";

export class MessagingServer {
  private io: SocketIO.Server;

  constructor(private httpServer: Server) {
    this.setUpSocket();
  }

  private setUpSocket(): void {
    this.io = socketIO();
  }

  public listen(): void {
    this.io.listen(this.httpServer);
    console.log("Messaging server listening");
    handleMessageEvents(this.io);
  }

}