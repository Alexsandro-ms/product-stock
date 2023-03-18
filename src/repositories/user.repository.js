import { prisma } from "../services/prisma.js";

export const createUser = async (data) => {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      phone: true,
      createAt: true,
      updateAt: true
    }
  });

  return user;
};

export const get = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getById = async (req, res) => {
  try {
    const user = await getById(Number(req.params.id));
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
