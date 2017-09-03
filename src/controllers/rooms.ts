import { Request, Response } from "express";

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