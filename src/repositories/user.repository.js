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

export const getAll = async () => {
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
    return error;
  }
};

export const getById = async (id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return error;
  }
};
