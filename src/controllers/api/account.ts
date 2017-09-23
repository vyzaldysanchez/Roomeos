import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ApiResponseRender } from "../../util/ApiResponseRender";
import User, { UserModel } from "../../models/User";

/**
 * GET /account
 */
export let getAccountInfo = (req: Request, res: Response) => {

  const responseRender = new ApiResponseRender(res);
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: JwtPayload) => {

    const userId = decoded.sub;

    User.findById(userId).then((user: UserModel) => {
      responseRender.render({
        _id: user.id,
        email: user.email,
        facebook: user.facebook,
        profile: user.profile
      });
    }).catch(error => {
      responseRender.renderValidationError(error);
    });

  });

};