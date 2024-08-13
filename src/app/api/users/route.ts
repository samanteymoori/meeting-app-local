import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_USER,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  port: process.env.NEXT_PUBLIC_DB_PORT,
});
export async function GET(request: NextRequest) {
  try {
    const res = await pool.query("SELECT * FROM users ORDER BY first_name");

    return NextResponse.json({ rows: res.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
