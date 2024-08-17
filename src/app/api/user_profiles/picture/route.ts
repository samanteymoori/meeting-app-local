import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

export async function POST(request: NextRequest) {
  const pool = getPool();

  try {
    const requestBody = await request.json();
    const jwt_token = request.cookies.get("jwt_token");
    const tokenToVerify = jwt_token?.value.replaceAll(`\"`, ``) as any;
    const verified: any = jwt.verify(tokenToVerify, SECRET_KEY);

    const values = [requestBody.file, verified.id];
    await pool.query(
      `UPDATE public.user_profile_pictures SET url=$1 WHERE user_id=$2 and is_primary=true
      `,
      values
    );
    return NextResponse.json({ file: requestBody.file }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
