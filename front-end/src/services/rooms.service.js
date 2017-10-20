import { API_ROOT, DEFAULT_HEADERS, getAuthorizationHeader } from "./index";
import type { ChatRoom } from "../models/chat-room";
import { List } from "immutable";

export async function createRoom(newRoom: ChatRoom): Promise<ChatRoom> {
  try {
    const response = await fetch(API_ROOT + "/rooms", {
      headers: {...DEFAULT_HEADERS, ...getAuthorizationHeader()},
      method: "POST",
      body: JSON.stringify(newRoom)
    });
    const createdRoom = await response.json();
    return Promise.resolve(createdRoom);
  }
  catch (error) {
    return Promise.reject(error);
  }
}

export async function loadMyRooms(userId: String): Promise<List<ChatRoom>> {
  try {
    const response = await fetch(API_ROOT + `/users/${userId}/rooms`, {
      headers: {...DEFAULT_HEADERS, ...getAuthorizationHeader()},
      method: "GET"
    });
    const roomsList = await response.json();
    return Promise.resolve(List(roomsList));
  }
  catch (error) {
    return Promise.reject(error);
  }
}

export async function getRoomById(roomId: String): Promise<ChatRoom> {
  try {
    const response = await fetch(API_ROOT + `/rooms/${roomId}`, {
      headers: {...DEFAULT_HEADERS, ...getAuthorizationHeader()},
      method: "GET"
    });
    const room = await response.json();
    return Promise.resolve(room);
  }
  catch (error) {
    return Promise.reject(error);
  }
}