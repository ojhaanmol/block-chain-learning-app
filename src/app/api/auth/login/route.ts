import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../schemas/login";
import { VALIDATION_ERROR } from "../../constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = loginSchema.safeParse(body);
  if (validation.error) {
    console.log(validation.error.format());
    return NextResponse.json({ message: VALIDATION_ERROR }, { status: 400 });
  }
  return NextResponse.json({}, { status: 200 });
}
