import { client, storeUserPin, storeUserPinMetaData } from "./index";
import { describe, test, expect } from "@jest/globals";

describe("TEST FOR IN-MEMORY DB", () => {
  beforeAll(() => {
    client.connect();
  });
  afterAll(async () => {
    await client.quit();
  });
  test("should store user pin in the kv database.", async () => {
    await client.set("Key", "Value");
    const storedValue = await client.get("Key");
    expect(storedValue).toBe("Value");
  });
});
