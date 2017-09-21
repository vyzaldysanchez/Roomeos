import { Router } from "express";
import * as passportConfig from "../config/passport";
import * as RoomsApiController from "../controllers/api/rooms";

const router = Router();

router.post("/rooms", passportConfig.isApiAuthenticated, RoomsApiController.postCreateRoom);
router.get("/users/:userId/rooms", passportConfig.isApiAuthenticated, RoomsApiController.getMyRooms);

export default router;