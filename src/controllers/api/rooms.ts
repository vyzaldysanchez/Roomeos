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
      _id: doc.id,
      name: doc.name,
      description: doc.description,
      roomIcon: doc.roomIcon,
      roomHeaderImage: doc.roomHeaderImage,
      visibility: doc.visibility,
      category: doc.category,
      location: doc.location,
      maxChatters: doc.maxChatters,
      tags: doc.tags,
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

  Room.find({createdBy}).populate("createdBy", "profile").then(myRooms => {
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

/**
 * GET /rooms/:id
 */
export let getChatRoom = async (req: Request, res: Response) => {

  const responseRender = new ApiResponseRender(res);
  const roomId = req.params.id;
  const roomProjection = {
    _id: 1,
    name: 1,
    description: 1,
    visibility: 1,
    maxChatters: 1,
    registerChatters: 1,
    messages: 1,
  };
  const messageProjection = {
    _id: 1,
    content: 1,
    messageLevel: 1,
    mentions: 1,
    createdAt: 1,
    sentBy: 1,
  };

  try {
    const room = <RoomModel>await Room.findById(roomId, roomProjection).populate({
      path: "messages",
      select: messageProjection,
      options: {
        limit: 20,
        sort: {createdAt: -1}
      }
    });

    responseRender.render(
      room.toObject()
    );
  }
  catch (error) {
    responseRender.renderValidationError(error);
  }

};