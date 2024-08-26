import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest, { params: { id } }: any) {
  const pool = getPool();
  console.log(id);
  try {
    const res = await pool.query(
      `
	select m.* from meetings as m 
	join meeting_participants as  mp on m.id=mp.meeting_id
	join users u on u.id=mp.user_id
	join user_profiles up on u.id=up.user_id
	join user_profile_pictures as upp on u.id=upp.user_id
	where u.email=$1
	and end_date is null and ( action is null or action !='cancel')
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
