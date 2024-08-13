import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pool = getPool();
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
