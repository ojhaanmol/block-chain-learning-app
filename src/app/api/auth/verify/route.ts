import { NextRequest, NextResponse } from "next/server";
import { verifySchama } from "../schemas/verify";
import { VALIDATION_ERROR } from "../../constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = verifySchama.safeParse(body);
  if (validation.error) {
    console.log(validation.error.format());
    return NextResponse.json({ message: VALIDATION_ERROR }, { status: 400 });
  }
  return NextResponse.json({ message: "not so much success" }, { status: 200 });
}
