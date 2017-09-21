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

/**
 * GET /users/:userId/rooms
 */
export let getMyRooms = (req: Request, res: Response) => {

  const responseRender = new ApiResponseRender(res);
  const createdBy = req.params.userId;

  Room.find({ createdBy }).populate("createdBy", "profile").then(myRooms => {
    responseRender.render(myRooms.map((myRoom: RoomModel) => {
      const createdByUser = myRoom.createdBy;
      return {
        ...myRoom.toObject(),
        createdBy: {
          _id: createdByUser.id,
          name: createdByUser.profile.name,
          location: createdByUser.profile.location,
          email: createdByUser.email,
          gender: createdByUser.profile.gender,
          picture: createdByUser.profile.picture,
          website: createdByUser.profile.website
        }
      };
    }));
  }).catch(error => {
    responseRender.renderValidationError(error);
  });

};