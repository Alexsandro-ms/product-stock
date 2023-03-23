import {
  createUser,
  getAll,
  getById,
  updateUser,
  deleteUser
} from "../repositories/user.repository.js";
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

export const get = async (req, res) => {
  try {
    const users = await getAll();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getId = async (req, res) => {
  try {
    const id = req.params.id;

    if (!Number(id)) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = await getById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500);
  }
};

export const update = async (req, res) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    await deleteUser(Number(req.params.id));
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error);
  }
};
