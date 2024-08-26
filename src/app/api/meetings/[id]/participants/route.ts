import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest, { params: { id } }: any) {
  const pool = getPool();
  console.log(id);
  try {
    const res = await pool.query(
      `
      select m.*,u.*,up.location,p.address,u2.* from meetings as m 
      join places p on m.place_id=p.id
      join meeting_participants as  mp on m.id=mp.meeting_id 
      join users u on u.id=mp.user_id 
      join user_profiles up on u.id=up.user_id
      join user_profile_pictures as upp on u.id=upp.user_id
      join users u2 on u2.id=mp.meeting_participant_id
      and end_date is null and ( action is null or action !='cancel')
      and u2.email=$1
`,
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
