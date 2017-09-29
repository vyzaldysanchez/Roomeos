import { Chatter } from "./chatter";
import { RoomMessage } from "./room-message";

export interface ChatRoom {
  _id: String;
  name: String;
  description: String;
  roomIcon: String;
  roomHeaderImage: String;
  visibility: String;
  category: String;
  location: String;
  maxChatters: Number;
  messages: RoomMessage[];
  registerChatters: Chatter[];
  tags: String[],
  createdBy: Chatter;
}