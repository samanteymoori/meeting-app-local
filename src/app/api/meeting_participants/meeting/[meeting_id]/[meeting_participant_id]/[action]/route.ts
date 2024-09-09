import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
export async function POST(
  request: NextRequest,
  { params: { meeting_id, meeting_participant_id, action } }: any
) {
  const pool = getPool();
  const values = [action, meeting_id, meeting_participant_id];
  console.log(JSON.stringify(values));
  try {
    await pool.query(
      `update meeting_participants set status=$1 where meeting_id=$2 and meeting_participant_id=$3`,
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
