import { Contact, User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
  toContactResponse,
} from "../models/contact-model";
import { Validation } from "../validations/validation";
import { ContactValidation } from "../validations/contact-validation";
import { prismaClient } from "../applications/database";
import { logger } from "../applications/logging";
import { ResponseError } from "../errors/response-error";
import { Pageable } from "../models/page";

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

  static async checkContactMustAxists(
    username: string,
    contactId: number
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustAxists(user.username, id);
    return toContactResponse(contact);
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.checkContactMustAxists(user.username, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toContactResponse(contact);
  }

  static async delete(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustAxists(user.username, id);

    const result = await prismaClient.contact.delete({
      where: {
        id: contact.id,
        username: user.username,
      },
    });

    return toContactResponse(result);
  }

  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const searchReaquest = Validation.validate(
      ContactValidation.SEARCH,
      request
    );

    const skip = (searchReaquest.page - 1) * searchReaquest.size;

    const filters = [];

    // first_name or last_name
    if (searchReaquest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchReaquest.name,
            },
          },
          {
            last_name: {
              contains: searchReaquest.name,
            },
          },
        ],
      });
    }

    if (searchReaquest.email) {
      filters.push({
        email: {
          contains: searchReaquest.email,
        },
      });
    }

    if (searchReaquest.phone) {
      filters.push({
        phone: {
          contains: searchReaquest.phone,
        },
      });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchReaquest.size,
      skip: skip,
    });

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: searchReaquest.page,
        total_page: Math.ceil(total / searchReaquest.page),
        size: searchReaquest.size,
      },
    };
  }
}
