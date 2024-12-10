import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../schemas/signup";
import { VALIDATION_ERROR } from "../../constants";
import { createUser } from "@/app/repository/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = signupSchema.safeParse(body);
  if (validation.error) {
    console.log(validation.error.format());
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
  const serverTime = new Date();
  return NextResponse.json(
    {
      message:
        "Signup successful. Please verify your email using the OTP sent.",
      "server-time": "" + +serverTime,
      "expire-time": "" + serverTime.setMinutes(serverTime.getMinutes() + 5),
    },
    { status: 201 },
  );
}
