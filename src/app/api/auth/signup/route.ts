import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../schemas/signup";
import { VALIDATION_ERROR, PIN_STRENGTH } from "../../constants";
import { createUser } from "@/app/repository/db";
import { storeUserPin } from "@/app/repository/kv";
import { transportOtpToEmail } from "@/app/services/mailer"
import crypto from "node:crypto"

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = signupSchema.safeParse(body);

  if (validation.error) {
    validation.error.format();
    return NextResponse.json({ message: VALIDATION_ERROR }, { status: 400 });
  }

  try {
    await createUser({ ...body });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json(
      { message: "something went wrong." },
      { status: 500 },
    );
  }

  const pin = crypto.randomInt(+('1'+'0'.repeat(PIN_STRENGTH-1)), +('9'.repeat(PIN_STRENGTH)));

  try {
    await storeUserPin(body.email, ''+pin)
  } catch (error) {
    if(error instanceof Error) console.log(error.message)
    return NextResponse.json(
      { message: "something went wrong." },
      { status: 500 },
    );
  }

  try {
    await transportOtpToEmail( ''+pin, body.email )
  } catch (error) {
    if(error instanceof Error) console.log(error.message)
      return NextResponse.json(
        { message: "something went wrong." },
        { status: 500 },
      );
  }

  const serverTime = new Date();
  return NextResponse.json(
    {
      message: "Signup successful. Please verify your email using the OTP sent.",
      "server-time": "" + +serverTime,
      "expire-time": "" + serverTime.setMinutes(serverTime.getMinutes() + 5),
    },
    { status: 201 },
  );
}
