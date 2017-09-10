import { Router } from "express";
import * as RoomsApiController from "../controllers/api/rooms";

const router = Router();
const apiRoutesPrefix = "/api";

router.post(apiRoutesPrefix + "/rooms", RoomsApiController.postCreateRoom);

export default router;