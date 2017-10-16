import { Router } from "express";
import * as passportConfig from "../config/passport";
import * as RoomsApiController from "../controllers/api/rooms";
import * as AccountApiController from "../controllers/api/account";

const router = Router();

router.post("/rooms", passportConfig.isApiAuthenticated, RoomsApiController.postCreateRoom);
router.get("/rooms/:id", passportConfig.isApiAuthenticated, RoomsApiController.getChatRoom);
router.get("/users/:userId/rooms", passportConfig.isApiAuthenticated, RoomsApiController.getMyRooms);
router.get("/account", passportConfig.isApiAuthenticated, AccountApiController.getAccountInfo);

export default router;