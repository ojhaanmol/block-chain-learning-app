import { describe, test, expect } from "@jest/globals";
import axios, { AxiosError } from "axios";
import crypto from "node:crypto";
import redis, { createClient, RedisClientType } from "redis";

const SERVER_URL = `http://localhost:3000`;

describe("USER VERIFICATION test.skip", () => {
  let redisClient: RedisClientType;
  beforeAll(() => {
    redisClient = createClient();
  });
  afterAll(async () => {
    // await redisClient.quit()
  });
  test("test.skip for validating email:", async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/verify`, {
        email: "",
        otp: crypto.randomInt(100000, 999999),
      });
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("test for validating otp:", async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/verify`, {
        email: crypto.randomUUID() + "@someEmail.com",
        otp: "",
      });
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test.skip("test.skip for validating invalid otp:", async () => {
    const signupRequest = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    await axios.post(`${SERVER_URL}/api/auth/signup`, signupRequest);
    const response = await axios.post(`${SERVER_URL}/api/auth/verify`, {
      email: signupRequest.email,
      otp: crypto.randomInt(100000, 999999),
    });
    expect(response.status).toBe(400);
  });
  test.skip("test for validate otp:", async () => {
    const signupRequest = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@somemail.com",
      phoneNumber: crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    await axios.post(`${SERVER_URL}/api/auth/signup`, signupRequest);
    const otp = await redisClient.get("otp:" + signupRequest.email);
    const response = await axios.post(`${SERVER_URL}/api/auth/verify`, {
      email: signupRequest.email,
      otp: otp ? otp : -1,
    });
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.message).toBe("Email verified successfully.");
  });
});
