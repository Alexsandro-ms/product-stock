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
