import { API_ROOT, DEFAULT_HEADERS, getAuthorizationHeader } from "./index";
import type { ChatRoom } from "../models/chat-room";

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

export async function loadMyRooms(userId: String): Promise<ChatRoom[]> {
  try {
    const response = await fetch(API_ROOT + `/users/${userId}/rooms`, {
      headers: {...DEFAULT_HEADERS, ...getAuthorizationHeader()},
      method: "GET"
    });
    const createdRoom = await response.json();
    return Promise.resolve(createdRoom);
  }
  catch (error) {
    return Promise.reject(error);
  }
}