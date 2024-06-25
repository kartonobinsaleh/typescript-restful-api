import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
  toAddressResponse,
} from "../models/address-model";
import { Validation } from "../validations/validation";
import { AddressValidation } from "../validations/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    await ContactService.checkContactMustAxists(
      user.username,
      request.contact_id
    );

    const newAddress = await prismaClient.address.create({
      data: createRequest,
    });

    return toAddressResponse(newAddress);
  }

  static async checkAddressMustAxists(
    addressId: number,
    contactId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findUnique({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address not found");
    }

    return address;
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);

    await ContactService.checkContactMustAxists(
      user.username,
      request.contact_id
    );

    const address = await this.checkAddressMustAxists(
      getRequest.id,
      getRequest.contact_id
    );

    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const updateRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );

    await ContactService.checkContactMustAxists(
      user.username,
      request.contact_id
    );

    await this.checkAddressMustAxists(
      updateRequest.id,
      updateRequest.contact_id
    );

    const updateAddress = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });

    return toAddressResponse(updateAddress);
  }

  static async delete(
    user: User,
    request: DeleteAddressRequest
  ): Promise<AddressResponse> {
    const deleteRequest = Validation.validate(
      AddressValidation.DELETE,
      request
    );

    await ContactService.checkContactMustAxists(
      user.username,
      request.contact_id
    );

    await this.checkAddressMustAxists(
      deleteRequest.id,
      deleteRequest.contact_id
    );

    const address = await prismaClient.address.delete({
      where: {
        id: deleteRequest.id,
      },
    });

    return toAddressResponse(address);
  }

  static async list(
    user: User,
    contactId: number
  ): Promise<Array<AddressResponse>> {
    await ContactService.checkContactMustAxists(user.username, contactId);

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((address) => toAddressResponse(address));
  }
}
