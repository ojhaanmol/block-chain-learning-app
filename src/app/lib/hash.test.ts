import { describe, test, expect } from "@jest/globals";
import { hashString } from "./hash";
import crypto from "node:crypto";

describe("Hashing Algorithm", () => {
  test("Hash should not be the same as the original string", () => {
    const originalString = "test-string";
    const salt = crypto.randomBytes(16).toString("hex");
    const hashed = hashString(originalString, salt);

    expect(hashed).not.toBe(originalString);
  });

  test("Rehashing the same string with the same salt should produce the same hash", () => {
    const originalString = "test-string";
    const salt = crypto.randomBytes(16).toString("hex");

    const hash1 = hashString(originalString, salt);
    const hash2 = hashString(originalString, salt);

    expect(hash1).toBe(hash2);
  });
});
