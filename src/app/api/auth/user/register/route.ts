import { getPool } from "@/helper/dbConnection";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = await req.json();
  const { first_name, last_name, email, confirm_password, password } =
    requestBody;
  const values = [email, first_name, last_name];
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await pool.query(
      `INSERT INTO public.users(
        email, first_name, last_name)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      values
    );
    // Authenticate user
    if (result.rows.length) {
      // Create JWT token
      const token = jwt.sign(
        {
          username: requestBody.email,
          ...result.rows?.[0],
          url: null,
        },
        SECRET_KEY
      );
      cookies().set({
        name: "jwt_token",
        value: JSON.stringify(token),
        httpOnly: true,
        path: "/",
        secure: true,
      });

      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
