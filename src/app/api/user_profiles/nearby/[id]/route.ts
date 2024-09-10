import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function GET(request: NextRequest, { params: { id } }: any) {
  const pool = getPool();
  console.log({ id });
  try {
    const res = await pool.query(
      ` SELECT *,COALESCE(url,'/images/user.png') as url  FROM (
      SELECT
          earth_distance(
              ll_to_earth(up.location[0], up.location[1]),
              ll_to_earth(self.location[0], self.location[1])
          ) AS distance_meters,u.*,up.*,upp.url
      FROM user_profiles up
      join users u on up.user_id=u.id
      join user_profile_pictures upp on up.user_id=upp.user_id
      join user_profiles self on 1=1
      where self.user_id=$1
      ) as sub
      ORDER BY 1
      `,
      [id]
    );
    console.log({ res });
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
