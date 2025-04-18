import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest) {
  const pool = getPool();
  try {
    const res = await pool.query(`select u.*,up.*,upp.url as url from users u
    join user_profiles up on u.id=up.user_id 
    join user_profile_pictures upp on up.user_id=upp.user_id
    ORDER BY first_name`);
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
