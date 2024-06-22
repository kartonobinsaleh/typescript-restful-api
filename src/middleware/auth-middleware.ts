import { NextFunction, Response } from "express";
import { prismaClient } from "../applications/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const requestToken = req.get("Authorization");

  if (requestToken) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: requestToken,
      },
    });

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({
      errors: "Unauthorized",
    })
    .end();
};
