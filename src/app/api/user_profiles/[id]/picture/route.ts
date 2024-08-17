import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest, { params: { id } }: any) {
  const pool = getPool();

  try {
    const res = await pool.query(
      `select url from  user_profile_pictures u
    where u.user_id=$1 and is_primary=true
    `,
      [id]
    );
    return NextResponse.json({ url: res.rows?.[0].url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
