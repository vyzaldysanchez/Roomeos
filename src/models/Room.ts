import { UserModel } from "./User";
import { Document, model, Schema } from "mongoose";
import { RoomMessageModel } from "./RoomMessage";
import "./RoomMessage";

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
    required: true,
    minlength: 3,
    maxlength: 75
  },
  description: {
    type: String,
    maxlength: 140
  },
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
  tags: {type: [String], validate: [tagsLimit, "{PATH} exceeds the limit of 3"]},
  createdBy: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true});

function tagsLimit(tags: String[]) {
  return tags.length <= 3;
}

const Room = model("Room", roomSchema);

export default Room;