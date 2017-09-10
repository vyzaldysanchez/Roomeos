import { Document, model, Schema } from "mongoose";
import { UserModel } from "./User";

export type RoomMessageLevel = "whisper" | "normal" | "loud";

export type RoomMessageModel = Document & {
  content: string,
  messageLevel: RoomMessageLevel,
  mentions: string[],
  sentBy: UserModel,
  createdAt: string
};

const roomMessageSchema = new Schema({
  content: String,
  messageLevel: String,
  sentBy: {type: Schema.Types.ObjectId, ref: "User"},
  mentions: [{type: Schema.Types.ObjectId, ref: "User"}],
}, {timestamps: true});

const RoomMessage = model("RoomMessage", roomMessageSchema);

export default RoomMessage;