import { Document, model, Schema } from "mongoose";
import { RoomMessageModel } from "./RoomMessage";
import { Chatter } from "./dto/Chatter";

export type RoomVisibilityModel = "public" | "private";

export type RoomModel = Document & {
  name: string,
  roomIcon: string,
  roomHeaderImage: string,
  visibility: RoomVisibilityModel,
  category: string,
  location: string,
  maxChatters: number,
  messages: RoomMessageModel[],
  registerChatters: Chatter[]
};

const roomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    enum: ["public", "private"]
  },
  location: String,
  maxChatters: Number,
  messages: [{type: Schema.Types.ObjectId, ref: "RoomMessage"}],
  registerChatters: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true});

const Room = model("Room", roomSchema);

export default Room;