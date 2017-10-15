import { MessageRequestDTO, MessageResponseDTO } from "../../models/dto/MessageDTO";
import Room, { RoomModel } from "../../models/Room";
import RoomMessage, { RoomMessageModel } from "../../models/RoomMessage";

export const handleRoomMessage = (message: MessageRequestDTO): Promise<MessageResponseDTO> => {
  return new Promise<MessageResponseDTO>(async (resolve: (value: MessageResponseDTO) => void) => {

    const room = <RoomModel> await Room.findById(message.roomId);
    const messageRecord = <RoomMessageModel>new RoomMessage();
    Object.assign(messageRecord, message);
    const persistedMessage = await messageRecord.save();
    room.messages.push(persistedMessage);
    room.save().then(() => {
      resolve({
        _id: persistedMessage.id,
        content: persistedMessage.content,
        messageLevel: persistedMessage.messageLevel,
        sentBy: persistedMessage.sentBy.toString(),
        mentions: persistedMessage.mentions,
        createdAt: persistedMessage.createdAt,
      });
    });

  });
};