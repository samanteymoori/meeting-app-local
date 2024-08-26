import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
export async function POST(
  request: NextRequest,
  { params: { action, id } }: any
) {
  const pool = getPool();
  const values = [action, id];
  console.log(JSON.stringify(values));
  try {
    await pool.query(
      `update meetings set action=$1, end_date=now() where id=$2`,
      values
    );
    return NextResponse.json({}, { status: 403 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
