import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/applications/web";
import { logger } from "../src/applications/logging";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Jl.Pasir Konci",
        city: "Bekasi",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "4444",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe("Jl.Pasir Konci");
    expect(response.body.data.city).toBe("Bekasi");
    expect(response.body.data.province).toBe("Jawa Barat");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("4444");
  });

  it("should reject create address if data is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Jl.Pasir Konci",
        city: "Bekasi",
        province: "Jawa Barat",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create address if contactId is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Jl.Pasir Konci",
        city: "Bekasi",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "4444",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create address if token is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", "salah")
      .send({
        street: "Jl.Pasir Konci",
        city: "Bekasi",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "4444",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
