import { NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "../schemas/forgot-password";
import { VALIDATION_ERROR } from "../../constants";

export async function POST(request: NextRequest) {
  const body = request.json();
  const validation = forgotPasswordSchema.safeParse(body);
  if (validation.error) {
    console.log(validation.error.format());
    return NextResponse.json({ message: VALIDATION_ERROR }, { status: 400 });
  }
  return NextResponse.json({}, { status: 200 });
}
