import { create, get, getById } from "../controllers/user.controller.js";

export const userRoutes = (app) => {
  app.post("/user", create);
  app.get("/user", get);
  app.get("/user/:id", getById);
};
