import { describe, test, expect } from "@jest/globals";
import axios, { AxiosError } from "axios";
import crypto from "node:crypto";

const SERVER_URL = `http://localhost:3000`;

describe("SIGNUP test", () => {
  test("should validate empty name", async () => {
    const request = {
      name: "",
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify(request),
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should validate username", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: "",
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify(request),
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should validate email", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: "",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify(request),
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should validate phoneNumber", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "",
      password: crypto.randomUUID(),
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify(request),
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should validate password", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: "",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify(request),
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should reject with username already exist", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify({ ...request }),
      );
    } catch (error) {
      console.log(error);
    }
    const request2 = {
      name: crypto.randomUUID(),
      username: request.username,
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      const response2 = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify({ ...request2 }),
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
      if (error instanceof AxiosError)
        expect(error.response?.data?.message).toBe("username already exist.");
    }
  });
  test("should reject with email already exist", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify({ ...request }),
      );
    } catch (error) {
      console.log(error);
    }
    const request2 = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: request.email,
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      const response2 = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify({ ...request2 }),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.status).toBe(400);
        expect(error.response?.data?.message).toBe("email already exist.");
      }
    }
  });
  test("should create new account", async () => {
    const request = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: "" + crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        JSON.stringify({ ...request, password: "" }),
      );
      expect(response.status).toBe(201);
      expect(response.data.message).toBe(
        "Signup successful. Please verify your email using the OTP sent.",
      );
      expect(response.data?.["server-time"]).toBeDefined();
      expect(response.data?.["expire-time"]).toBeDefined();
    } catch (error) {
      console.log(error);
    }
  });
});
