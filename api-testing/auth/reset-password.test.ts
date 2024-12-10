import { describe, test, expect, beforeAll } from "@jest/globals";
import axios, { AxiosError } from "axios";
import crypto from "node:crypto";
import redis, { createClient, RedisClientType } from "redis";

const SERVER_URL = `http://localhost:3000`;

describe("RESET PASSWORD test.skip", () => {
  let redisClient: RedisClientType;
  beforeAll(() => {
    redisClient = createClient();
  });
  const headers = {
    Authorization: "Bearer ",
  };
  const userEmail = crypto.randomUUID() + "@somemail.com";
  const userPassword = crypto.randomUUID();
  // beforeAll(async()=>{
  //     const signupRequest = {
  //         name: crypto.randomUUID(),
  //         username: crypto.randomUUID(),
  //         email: userEmail,
  //         phoneNumber: crypto.randomInt(1000000000,9999999999),
  //         password: userPassword
  //     }
  //     try {
  //         await axios.post(`${SERVER_URL}/api/auth/signup`,signupRequest);
  //     } catch (error) {
  //         console.log(error)
  //     }

  //     const otp = await redisClient.get('otp:'+signupRequest.email)
  //     const verificationRequest = {
  //         email: userEmail,
  //         otp: otp ? +otp : -1
  //     }
  //     try {
  //         await axios.post(`${SERVER_URL}/api/auth/verify`,verificationRequest)
  //     } catch (error) {
  //         console.log(error);
  //     }

  //     const loginRequest = {
  //         email: userEmail,
  //         password: userPassword
  //     }
  //     let response = null;
  //     try {
  //         response = await axios.post(`${SERVER_URL}/api/auth/login`,loginRequest);
  //     } catch (error) {
  //         console.log(error)
  //     }

  //     headers.Authorization += response?.data?.jwt_token
  // })
  // afterAll(async()=>{
  //     // await redisClient.quit()
  // })
  test("should validate email", async () => {
    const request = {
      email: "",
      oldPassword: crypto.randomUUID(),
      newPassword: crypto.randomUUID(),
    };
    try {
      // const response = await axios.post(`${SERVER_URL}/api/auth/reset-password`,request, {headers});
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should validate oldPassword", async () => {
    const request = {
      email: crypto.randomUUID + "@somaeorg.com",
      oldPassword: "",
      newPassword: crypto.randomUUID(),
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/reset-password`,
        request,
        { headers },
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test("should validate newPassword", async () => {
    const request = {
      email: crypto.randomUUID + "@somaeorg.com",
      oldPassword: crypto.randomUUID(),
      newPassword: "",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/reset-password`,
        request,
        { headers },
      );
    } catch (error) {
      if (error instanceof AxiosError) expect(error.status).toBe(400);
    }
  });
  test.skip("should validate wrong email", async () => {
    const request = {
      email: crypto.randomUUID + "@somaeorg.com",
      oldPassword: crypto.randomUUID(),
      newPassword: crypto.randomUUID(),
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/reset-password`,
      request,
      { headers },
    );
    expect(response.status).toBe(404);
    expect(response.data).toBeDefined();
    expect(response.data.message).toBe("this email dose not exist");
  });
  test.skip("should validate wrong password", async () => {
    const request = {
      email: userEmail,
      oldPassword: crypto.randomUUID(),
      newPassword: crypto.randomUUID(),
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/reset-password`,
      request,
      { headers },
    );
    expect(response.status).toBe(400);
    expect(response.data).toBeDefined();
    expect(response.data.message).toBe("invalid password");
  });
  test.skip("should change password", async () => {
    const request = {
      email: userEmail,
      oldPassword: userPassword,
      newPassword: crypto.randomUUID(),
    };
    const response = await axios.post(
      `${SERVER_URL}/api/auth/reset-password`,
      request,
      { headers },
    );
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.message).toBe("password change successful");

    const loginRequest = {
      email: userEmail,
      password: request.newPassword,
    };
    const newLoginResponse = await axios.post(
      `${SERVER_URL}/api/auth/login`,
      loginRequest,
    );
    expect(newLoginResponse.status).toBe(200);
  });
});
