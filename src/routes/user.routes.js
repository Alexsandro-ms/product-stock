import { create, get, getById } from "../controllers/user.controller.js";

export const userRoutes = (app) => {
  app.get("/", (req, res) => res.json({}));
};
