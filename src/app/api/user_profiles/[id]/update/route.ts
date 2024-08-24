import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function POST(request: NextRequest, { params: { id } }: any) {
  const pool = getPool();
  const requestBody = await request.json();
  const profile_detail: ProfileType = requestBody;
  const { first_name, last_name, job, weight, height, hobbies, education } =
    profile_detail;
  const values = [weight, height, hobbies, education, job, id];
  const basic = [first_name, last_name, id];

  try {
    await pool.query(
      `UPDATE user_profiles set weight = $1, height =$2,hobbies=$3,education=$4,job=$5
      WHERE user_id= $6`,
      values
    );
    await pool.query(
      `UPDATE users set first_name=$1,last_name=$2
        WHERE id= $3`,
      basic
    );
    return NextResponse.json({ result: "success" }, { status: 200 });
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
