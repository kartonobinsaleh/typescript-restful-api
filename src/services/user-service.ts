import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import {
  CreateUserRequest,
  UserResponse,
  toUserResponse,
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username sudah digunakan");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const newUser = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(newUser);
  }
}
