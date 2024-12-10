import { describe, test, expect } from "@jest/globals";
import axios, { AxiosError } from "axios";
import crypto from "node:crypto";
import redis, { createClient, RedisClientType } from "redis";

const SERVER_URL = `http://localhost:3000`;

describe("LOGIN test.skip", () => {
  let redisClient: RedisClientType;
  beforeAll(() => {
    redisClient = createClient();
  });
  afterAll(async () => {
    // await redisClient.quit()
  });
  test("should check for empty email", async () => {
    const request = {
      email: "",
      password: "password123",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/login`,
        request,
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should check for empty password", async () => {
    const request = {
      email: crypto.randomUUID() + "@someorg.com",
      password: "",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/login`,
        request,
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test.skip("should check for wrong password", async () => {
    const signupRequest = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@example.com",
      phoneNumber: crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    await axios.post(`${SERVER_URL}/api/auth/signup`, signupRequest);
    const otp = await redisClient.get("otp:" + signupRequest.email);
    const verifyRequest = {
      email: signupRequest.email,
      otp: otp ? +otp : -1,
    };
    await axios.post(`${SERVER_URL}/api/auth/verify`, verifyRequest);
    const request = {
      email: signupRequest.email,
      password: crypto.randomUUID(),
    };
    const response = await axios.post(`${SERVER_URL}/api/auth/login`, request);
    expect(response.status).toBe(401);
  });
  test.skip("should login", async () => {
    const signupRequest = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@example.com",
      phoneNumber: crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    await axios.post(`${SERVER_URL}/api/auth/signup`, signupRequest);
    const otp = await redisClient.get("otp:" + signupRequest.email);
    const verifyRequest = {
      email: signupRequest.email,
      otp: otp ? +otp : -1,
    };
    await axios.post(`${SERVER_URL}/api/auth/verify`, verifyRequest);
    const request = {
      email: signupRequest.email,
      password: signupRequest.password,
    };
    const response = await axios.post(`${SERVER_URL}/api/auth/login`, request);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toBe("Login successful");
    expect(response.data.token).toBeDefined();
  });
});
