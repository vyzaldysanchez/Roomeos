import { Request, Response } from "express";
import Room, { RoomModel } from "../models/Room";

/**
 * GET /rooms
 * Home page.
 */
export let getMyRooms = (req: Request, res: Response) => {
  res.render("rooms/my-rooms", {
    title: "My Rooms"
  });
};

/**
 * GET /rooms/discover
 * Home page.
 */
export let discoverRooms = (req: Request, res: Response) => {
  res.render("rooms/discover", {
    title: "Discover rooms"
  });
};

/**
 * GET /rooms/:id
 */
export let getChatRoom = (req: Request, res: Response) => {
  const roomId = req.params.id;

  Room.findById(roomId, {"name": true}, (err: any, room: RoomModel) => {
    if (err || !room) {
      return;
    }
    res.render("rooms/chat", {
      title: room.name
    });
  });
};