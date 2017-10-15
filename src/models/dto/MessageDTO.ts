import { RoomMessageLevel } from "../RoomMessage";

type MessageBaseDTO = {
  content: string,
  messageLevel: RoomMessageLevel,
  mentions: string[],
  sentBy: string
};

export type MessageRequestDTO = MessageBaseDTO & {
  roomId: string,
};

export type MessageResponseDTO = MessageBaseDTO & {
  _id: string,
  createdAt: string
};