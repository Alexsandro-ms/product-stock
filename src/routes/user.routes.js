import {
  create,
  get,
  getId,
  remove,
  update
} from "../controllers/user.controller.js";

export const userRoutes = (app) => {
  app.post("/user", create);
  app.get("/user", get);
  app.get("/user/:id", getId);
  app.put("/user/:id", update);
  app.delete("/user/:id", remove);
};
