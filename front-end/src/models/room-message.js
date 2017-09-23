import { Chatter } from "./chatter";

export interface RoomMessage {
  _id: String;
  content: String;
  messageLevel: String;
  mentions: String[];
  sentBy: Chatter;
  createdAt: String;
}