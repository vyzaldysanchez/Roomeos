import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  if (req.user) {
    res.redirect("/rooms");
  }
  else {
    res.render("home", {
      title: "Home"
    });
  }
};