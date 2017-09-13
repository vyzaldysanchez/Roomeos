import { Router } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";

const router = Router();

/**
 * OAuth authentication routes. (Sign in)
 */
router.get("/facebook", passport.authenticate("facebook", {scope: ["email", "public_profile"]}));
router.get("/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/login"}), (req, res) => {
  const payload: JwtPayload = {sub: req.user.id};
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie("jwt", jwtToken, {expires: false});
  res.redirect(req.session.returnTo || "/");
});


export default router;