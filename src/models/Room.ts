import { UserModel } from "./User";
import { Document, model, Schema } from "mongoose";
import { RoomMessageModel } from "./RoomMessage";

export const MAX_NUMBER_OF_CHATTERS = 250;

export type RoomVisibilityModel = "public" | "private";

export type RoomModel = Document & {
  name: string,
  description: string,
  roomIcon: string,
  roomHeaderImage: string,
  visibility: RoomVisibilityModel,
  category: string,
  location: string,
  maxChatters: number,
  messages: RoomMessageModel[],
  registerChatters: UserModel[],
  tags: string[],
  createdBy: UserModel
};

const roomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  visibility: {
    type: String,
    enum: ["public", "private"]
  },
  location: String,
  maxChatters: {
    type: Number,
    min: 1,
    max: MAX_NUMBER_OF_CHATTERS
  },
  messages: [{type: Schema.Types.ObjectId, ref: "RoomMessage"}],
  registerChatters: [{type: Schema.Types.ObjectId, ref: "User"}],
  tags: [String],
  createdBy: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true});

const Room = model("Room", roomSchema);

export default Room;