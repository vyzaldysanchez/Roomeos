import { ChatRoom } from "../models/chat-room";
import * as roomsService from "../services/rooms.service";
import { List } from "immutable";

const ADD_ROOM = "add_room";
const LOAD_MY_ROOMS = "load_my_rooms";

const initialState = {
  myRooms: List()
};

export function addRoom(newRoom: ChatRoom): Function {
  return function (dispatch: Function, getState: Function) {
    return roomsService.createRoom(newRoom)
      .then(createdRoom => dispatch({
        type: ADD_ROOM,
        createdRoom
      }))
      .catch((error) => console.warn("Error in addRoom: ", error))
  }
}

export function loadMyRooms(userId: String): Function {
  return function (dispatch: Function, getState: Function) {
    return roomsService.loadMyRooms(userId)
      .then(myRooms => dispatch({
        type: LOAD_MY_ROOMS,
        myRooms
      }))
      .catch((error) => console.warn("Error in loadMyRooms: ", error))
  }
}

export function rooms(state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM:
      return {
        ...state,
        myRooms: state.myRooms.push(action.newRoom)
      };
    case LOAD_MY_ROOMS:
      return {
        ...state,
        myRooms: action.myRooms
      };
    default:
      return state
  }
}