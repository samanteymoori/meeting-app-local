import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const values = ["87e88d18-1af1-42cc-bcf1-7050e56b9b65"];
    const res = await client.query(
      "SELECT * FROM users WHERE id=$1 ORDER BY first_name",
      values
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
