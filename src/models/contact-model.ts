import { Contact } from "@prisma/client";

// Request
export type CreateContactRequest = {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

// Response
export type ContactResponse = {
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
};

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
  };
}
