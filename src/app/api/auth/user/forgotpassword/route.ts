import { getPool } from "@/helper/dbConnection";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = await req.json();
  const { username } = requestBody;
  console.log({ requestBody });
  const values = [username];
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await pool.query(
      `SELECT * FROM users u
      WHERE email=$1 
      ORDER BY first_name`,
      values
    );
    if (result.rows.length) {
      return NextResponse.json({ result: "success" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid username " }, { status: 403 });
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
