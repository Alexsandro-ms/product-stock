import { jest } from "@jest/globals";
import app from "../../../src/index.js";
import request from "supertest";

import { prisma } from "../../../src/services/prisma.js";
import { getId } from "../../../src/controllers/user.controller";

describe("POST /user", () => {
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: "johndoe@gmail.com" } });
  });

  test("should create a new user", async () => {
    let mockUser = {
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
    let mockUser = {
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
  test("should search all registered users", async () => {
    let registeredUsers = [
      {
        id: 9,
        name: "teste",
        email: "teste@gmail.com",
        phone: "12345678900"
      }
    ];
    const response = await request(app).get("/user");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", registeredUsers[0].id);
    expect(response.body[0]).toHaveProperty("name", registeredUsers[0].name);
    expect(response.body[0]).toHaveProperty("email", registeredUsers[0].email);
    expect(response.body[0]).toHaveProperty("phone", registeredUsers[0].phone);
  });

  test("should search for a user by id", async () => {
    let registeredUsers = {
      id: 9,
      name: "teste",
      email: "teste@gmail.com",
      phone: "12345678900",
      createAt: "2023-03-21T18:54:25.987Z",
      updateAt: "2023-03-22T18:29:32.639Z"
    };

    const response = await request(app).get(`/user/${registeredUsers.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name", registeredUsers.name);
    expect(response.body).toHaveProperty("email", registeredUsers.email);
    expect(response.body).toHaveProperty("phone", registeredUsers.phone);
    expect(response.body).toHaveProperty("createAt", registeredUsers.createAt);
    expect(response.body).toHaveProperty("updateAt", registeredUsers.updateAt);
  });

  test("An error should occur when trying to search for a user by id", async () => {
    let registeredUsers = {
      id: 87897
    };

    const response = await request(app).get(`/user/${registeredUsers.id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "User not found.");
  });

  test("should return 500 when getById throws an error", async () => {
    const req = { params: { id: "123" } };
    const res = { status: jest.fn(() => res), send: jest.fn() };
    const getById = jest.fn(() => {
      throw new Error("Test error");
    });

    await getId(req, res, getById);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("PUT /user", () => {
  test("should change information of a user", async () => {
    let registeredUsers = {
      id: 40,
      email: `${Date.now()}@email.com`
    };
    const response = await request(app)
      .put(`/user/${registeredUsers.id}`)
      .send(registeredUsers);

    expect(response.statusCode).toBe(200);
  });
  test("There should be an error changing a users information", async () => {
    let registeredUsers = {
      id: "a"
    };
    const response = await request(app).put(`/user/${registeredUsers.id}`);

    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /user", () => {
  test("should delete a user", async () => {
    const deleteUser = { id: 56 };
    const response = await request(app).delete(`/user/${deleteUser.id}`);
    expect(response.statusCode).toBe(200);
  });

  test("an error should occur when trying to delete a user", async () => {
    const response = await request(app).delete("/user/999");
    expect(response.statusCode).toBe(400);
  });
});
