import app from "../../../src/index.js";
import request from "supertest";

describe("POST /user", () => {
  test("should create a new user", async () => {
    const mockUser = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      phone: "12345678900"
    };

    const response = await request(app).post("/user").send(mockUser);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", mockUser.name);
    expect(response.body).toHaveProperty("email", mockUser.email);
  });

  test("Erro ao criar usuario", async () => {
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
