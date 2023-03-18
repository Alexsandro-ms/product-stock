import { createUser } from "../repositories/user.repository.js";
import { userValidation } from "../validation/user.validation.js";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    await userValidation.validate(req.body);

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashPassword;
    const user = await createUser(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
