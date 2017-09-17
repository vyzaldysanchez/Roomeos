import { Request, Response } from "express";
import Room, { RoomModel } from "../../models/Room";
import { ApiResponseRender } from "../../util/ApiResponseRender";

/**
 * POST /rooms
 */
export let postCreateRoom = (req: Request, res: Response) => {

  const responseRender = new ApiResponseRender(res);
  const requestBody = req.body;
  const newRoom = <RoomModel>new Room();

  Object.assign(newRoom, requestBody);

  newRoom.save().then(doc => {
    responseRender.render({
      id: doc.id,
      name: doc.name,
      roomIcon: doc.roomIcon,
      roomHeaderImage: doc.roomHeaderImage,
      visibility: doc.visibility,
      category: doc.category,
      location: doc.location,
      maxChatters: doc.maxChatters,
      createdBy: doc.createdBy
    });
  }).catch(error => {
    responseRender.renderValidationError(error);
  });

};