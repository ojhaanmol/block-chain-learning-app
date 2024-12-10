import { describe, test, expect, beforeAll } from "@jest/globals";
import axios from "axios";
import crypto from "node:crypto";
import redis, { createClient, RedisClientType } from "redis";

const SERVER_URL = `http://localhost:3000`;

describe("LOGOUT test.skip", () => {
  let redisClient: RedisClientType;
  beforeAll(() => {
    redisClient = createClient();
  });
  const headers = {
    Authorization: "Bearer ",
  };
  const userEmail = crypto.randomUUID() + "@somemail.com";
  const userPassword = crypto.randomUUID();
  beforeAll(async () => {
    const signupRequest = {
      name: crypto.randomUUID(),
      username: crypto.randomUUID(),
      email: userEmail,
      phoneNumber: crypto.randomInt(1000000000, 9999999999),
      password: userPassword,
    };
    await axios.post(`${SERVER_URL}/api/auth/signup`, signupRequest);

    const otp = await redisClient.get("otp:" + signupRequest.email);
    const verificationRequest = {
      email: userEmail,
      otp: otp ? +otp : -1,
    };
    await axios.post(`${SERVER_URL}/api/auth/verify`, verificationRequest);

    const loginRequest = {
      email: userEmail,
      password: userPassword,
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/login`,
      loginRequest,
    );

    headers.Authorization += response.data.jwt_token;
  });
  afterAll(async () => {
    await redisClient.quit();
  });
  test.skip("should validate email", async () => {
    const request = {
      email: "",
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/logout`,
      request,
      { headers },
    );
    expect(response.status).toBe(400);
  });
  test.skip("should validate wrong email", async () => {
    const request = {
      email: crypto.randomUUID() + "@somemail.com",
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/logout`,
      request,
      { headers },
    );
    expect(response.status).toBe(401);
  });
  test.skip("should email", async () => {
    const request = {
      email: userEmail,
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/logout`,
      request,
      { headers },
    );
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.message).toBe("Logout successful.");

    const response2 = await axios.post(
      `${SERVER_URL}/api/auth/logout`,
      request,
      { headers },
    );
    expect(response.status).toBe(401);
  });
});
