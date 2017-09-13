import {Chatter} from './chatter';

export interface RoomMessage {
  content: String,
  messageLevel: String,
  mentions: String[],
  sentBy: Chatter,
  createdAt: String
}