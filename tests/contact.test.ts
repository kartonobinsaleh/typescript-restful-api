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
