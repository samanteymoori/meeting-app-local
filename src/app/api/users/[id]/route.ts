import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const res = await client.query(
      "SELECT * FROM users WHERE id=@id ORDER BY first_name"
    );
    return NextResponse.json({ rows: res.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
