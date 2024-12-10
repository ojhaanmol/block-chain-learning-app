import { kvUrl } from "../../config/server";
import { createClient } from "redis";

// exported for testing purpose.
export const client = createClient({ url: kvUrl });

export async function storeUserPin(email: string, pin: string) {}

export async function storeUserPinMetaData(email: string, chanse: number) {}
