import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../schemas/user";
import { hashString } from "../../lib/hash";

// exported for testing.
export const prisma = new PrismaClient();

export async function createUser(user: User) {
  try {
    const salt = crypto.randomUUID();
    await prisma.user.create({
      data: { ...user, password: hashString(user.password, salt) + "." + salt },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        throw new Error(error.meta?.target + " already exist.");
    }
    throw new Error("" + error);
  }
}

export async function getUser(email: string) {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: { email },
    });
  } catch (error) {
    console.log("do error handeling in " + __filename);
  }
}

export async function updateUserPassword(email: string, password: string) {
  try {
    await prisma.user.update({
      where: { email },
      data: { password },
    });
  } catch (error) {
    console.log("do error handeling in " + __filename);
  }
}
