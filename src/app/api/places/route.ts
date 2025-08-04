import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest) {
  const pool = getPool();

  try {
    const res = await pool.query(`SELECT * FROM places pl
     join place_pictures plp on pl.id=plp.place_id
     ORDER BY name`);
    return NextResponse.json({ rows: res.rows }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
