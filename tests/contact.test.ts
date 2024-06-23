import supertest from "supertest";
import { web } from "../src/applications/web";
import { logger } from "../src/applications/logging";
import { ContactTest, UserTest } from "./test-util";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "kartono",
        last_name: "saleh",
        email: "kartono@gmail.com",
        phone: "0813",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("kartono");
    expect(response.body.data.last_name).toBe("saleh");
    expect(response.body.data.email).toBe("kartono@gmail.com");
    expect(response.body.data.phone).toBe("0813");
  });

  it("should reject create new contact if data is invalid", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "kartono",
        phone: "0813777777777777777777777711",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create new contact if token is invalid", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "salah")
      .send({
        first_name: "",
        last_name: "",
        email: "kartono",
        phone: "0813777777777777777777777711",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("Authorization", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });

  it("should reject get contact if contactId is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("Authorization", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("Authorization", "test")
      .send({
        first_name: "update",
        last_name: "update",
        email: "update@gmail.com",
        phone: "081333",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("update");
    expect(response.body.data.last_name).toBe("update");
    expect(response.body.data.email).toBe("update@gmail.com");
    expect(response.body.data.phone).toBe("081333");
  });

  it("should reject update contact if contactId is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}`)
      .set("Authorization", "test")
      .send({
        first_name: "update",
        last_name: "update",
        email: "update@gmail.com",
        phone: "081333",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update contact if data is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "update",
        phone: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update contact if token is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("Authorization", "salah")
      .send({
        first_name: "update",
        last_name: "update",
        email: "update@gmail.com",
        phone: "081333",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
