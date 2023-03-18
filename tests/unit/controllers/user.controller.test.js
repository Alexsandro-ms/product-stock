import app from "../../../src/index.js";
import request from "supertest";
import { prisma } from "../../../src/services/prisma.js";

describe("POST /user", () => {
  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
  test("should create a new user", async () => {
    const mockUser = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
      phone: "12345678900"
    };

    const response = await request(app).post("/user").send(mockUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", mockUser.name);
    expect(response.body).toHaveProperty("email", mockUser.email);
  });

  test("An error should occur when trying to create a user", async () => {
    const mockUser = {
      name: "John Doe",
      email: "",
      password: "123456",
      phone: ""
    };

    const response = await request(app).post("/user").send(mockUser);

    expect(response.statusCode).toBe(400);
  });
});

describe("GET /user", () => {
  beforeAll(async () => {
    const userTest = {
      name: "teste",
      email: "teste@gmail.com",
      password: "123456",
      phone: "12345678900"
    };
    await prisma.user.create({
      data: userTest
    });
  });

  test("should search all registered users", async () => {
    const registeredUsers = [
      {
        name: "teste",
        email: "teste@gmail.com",
        phone: "12345678900"
      }
    ];
    const response = await request(app).get("/user");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("name", registeredUsers[0].name);
    expect(response.body[0]).toHaveProperty("email", registeredUsers[0].email);
    expect(response.body[0]).toHaveProperty("phone", registeredUsers[0].phone);
  });
});
