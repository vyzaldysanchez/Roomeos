import * as RoomsMessagingController from "./controllers/rooms-messaging-controller";
import { MessageRequestDTO } from "../models/dto/MessageDTO";
import { ChatterDTO } from "../models/dto/ChatterDTO";

const handleMessageEvents = (io: SocketIO.Server) => {

  io.on("connect", (socket: SocketIO.Socket) => {
    console.log("Client %s connected ", socket.id);

    socket.on("room connect", (chatter: ChatterDTO) => {
      socket.broadcast.emit("room connect", {
        content: `@${chatter.name} joined the room`
      });
    });

    socket.on("room message", async (message: MessageRequestDTO) => {
      const persistedMessage = await RoomsMessagingController.handleRoomMessage(message);
      socket.broadcast.emit("room message", persistedMessage);
    });

    socket.on("disconnect", () => {
      console.log("Client %s disconnected", socket.id);
    });
  });

};

export default handleMessageEvents;