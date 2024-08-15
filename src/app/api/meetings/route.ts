import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function POST(request: NextRequest) {
  const pool = getPool();
  try {
    await pool.query(`SELECT * FROM places pl
     join place_pictures plp on pl.id=plp.place_id
     ORDER BY name`);
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
