import { Router } from "express";
import * as RoomsApiController from "../controllers/api/rooms";

const router = Router();

router.post("/rooms", RoomsApiController.postCreateRoom);

export default router;