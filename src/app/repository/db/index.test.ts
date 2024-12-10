import crypto from "node:crypto";
import { describe, test, expect } from "@jest/globals";
import { prisma, createUser, getUser, updateUserPassword } from "./index";

describe("USER REPO TEST", () => {
  test("should create a new User in database", async () => {
    const data = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };
    await createUser(data);

    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });

    expect(user).toBeDefined();
    expect(user?.name).toBe(data.name);
  });
  test("should not create a new User with existing username in database.", async () => {
    const data = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };
    await createUser(data);

    const newUserData = {
      name: crypto.randomUUID(),
      username: data.username,
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };

    await expect(createUser(newUserData)).rejects.toThrow(
      new Error("username already exist."),
    );
  });
  test("should not create a new User with existing email in database.", async () => {
    const data = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };
    await createUser(data);

    const newUserData = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: data.email,
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };

    await expect(createUser(newUserData)).rejects.toThrow(
      new Error("email already exist."),
    );
  });
  test("should find a User with email in database", async () => {
    const data = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };
    await createUser(data);

    const user = await getUser(data.email);

    expect(user?.name).toBe(data.name);
  });
  test("should update password of a User with email in database", async () => {
    const data = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };
    await createUser(data);
    const newPassword = crypto.randomUUID();
    await updateUserPassword(data.email, newPassword);

    const user = await getUser(data.email);

    expect(user?.password).toBe(newPassword);
  });
  test("should store password in hash fromat.", async () => {
    const data = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somehost.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
      otp: "" + crypto.randomInt(10000, 99999),
      otpExpires: new Date().toISOString(),
    };
    await createUser(data);

    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });

    expect(user).toBeDefined();
    expect(user?.password).not.toBe(data.password);
  });
});
