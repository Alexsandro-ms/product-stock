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

export const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
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
    return users;
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    return res.status(400).send(error);
  }
};
