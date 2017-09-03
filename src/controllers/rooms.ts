import { Request, Response } from "express";

/**
 * GET /rooms/discover
 * Home page.
 */
export let discoverRooms = (req: Request, res: Response) => {
  res.render("rooms/discover", {
    title: "Discover rooms"
  });
};