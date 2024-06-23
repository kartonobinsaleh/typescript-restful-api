import { User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../models/contact-model";
import { Validation } from "../validations/validation";
import { ContactValidation } from "../validations/contact-validation";
import { prismaClient } from "../applications/database";
import { logger } from "../applications/logging";
import { ResponseError } from "../errors/response-error";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const newContact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(newContact);
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return toContactResponse(contact);
  }
}
