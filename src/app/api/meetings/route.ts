import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const pool = getPool();
  const requestBody = await request.json();
  const { owner_person_id, place_id, meeting_date, meeting_time } = requestBody;
  const values = [
    owner_person_id,
    place_id,
    new Date(meeting_date.substring(0, 10) + " " + meeting_time).toISOString(),
  ];

  try {
    const result = await pool.query(
      `INSERT INTO public.meetings(
         creator_user_id, place_id, meeting_date)
        VALUES ($1, $2, $3)
        RETURNING id;`,
      values
    );
    return NextResponse.json({ inserted: result.rows?.[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
