import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest, { params: { id } }: any) {
  const pool = getPool();

  try {
    const res = await pool.query(
      `select * from users u
      join user_profiles up on u.id=up.user_id 
      where u.id=$1
      ORDER BY first_name`,
      [id]
    );
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
