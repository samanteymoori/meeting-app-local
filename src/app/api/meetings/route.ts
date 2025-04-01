import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  const pool = getPool();
  const requestBody = await request.json();
  const {
    owner_person_id,
    place_id,
    meeting_date,
    meeting_time,
    person_to_meet_id,
  } = requestBody;
  console.log({ requestBody });
  const values = [
    owner_person_id,
    place_id,
    new Date(meeting_date.substring(0, 10) + " " + meeting_time).toISOString(),
  ];
  console.log({ values });
  try {
    const result = await pool.query(
      `INSERT INTO public.meetings(
         creator_user_id, place_id, meeting_date)
        VALUES ($1, $2, $3)
        RETURNING id;`,
      values
    );
    console.log("test");
    const meeting_id = result.rows[0]?.id;
    console.log({ meeting_id });
    await pool.query(
      `INSERT INTO public.meeting_participants(
        meeting_participant_id, meeting_id, user_id)
        VALUES ($1, $2, $3)`,
      [person_to_meet_id, meeting_id, owner_person_id]
    );

    return NextResponse.json({ inserted: result.rows?.[0] }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
