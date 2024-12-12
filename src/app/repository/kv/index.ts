import { kvUrl } from "../../config/server";
import { createClient } from "redis";

// exported for testing purpose.
export const client = createClient({ url: kvUrl });

export async function storeUserPin(email: string, pin: string) {
    await client.connect();
    await client.set( "otp:"+email, pin );
    await client.disconnect()
}

export async function storeUserPinMetaData(email: string, chance: number) {}
