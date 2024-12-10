import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import axios, { AxiosError } from "axios";
import crypto from "node:crypto";
import redis, { createClient, RedisClientType } from "redis";

const SERVER_URL = `http://localhost:3000`;

describe("FORGOT PASSWORD test.skip", () => {
  let redisClient: RedisClientType;
  beforeAll(() => {
    redisClient = createClient();
  });
  afterAll(async () => {});
  test("should validate email", async () => {
    const request = {
      email: "",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/forgot-password`,
        request,
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test.skip("should initiate reset-password", async () => {
    const signupRequest = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: crypto.randomUUID() + "@example.com",
      phoneNumber: crypto.randomInt(1000000000, 9999999999),
      password: crypto.randomUUID(),
    };
    try {
      await axios.post(`${SERVER_URL}/api/auth/signup`, signupRequest);
    } catch (error) {
      console.log(error);
    }
    const otp = await redisClient.get("otp:" + signupRequest.email);
    const verifyRequest = {
      email: signupRequest.email,
      otp: otp ? +otp : -1,
    };
    try {
      await axios.post(`${SERVER_URL}/api/auth/verify`, verifyRequest);
    } catch (error) {
      console.log(error);
    }
    const request = {
      email: signupRequest.email,
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/forgot-password`,
        request,
      );
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.message).toBeDefined();
      expect(response.data.message).toBe(
        "Password reset OTP sent to your email.",
      );
    } catch (error) {
      console.log(error);
    }
  });
});
