import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

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
    const result = await pool.query(
      `SELECT * FROM users u
      join user_profiles up on u.id=up.user_id 
      join user_profile_pictures upp on up.user_id=upp.user_id
      WHERE id=$1 
      ORDER BY first_name`,
      [id]
    );
    // Authenticate user
    if (result.rows.length) {
      // Create JWT token
      const token = jwt.sign(
        {
          username: requestBody.username,
          ...result.rows?.[0],
          url: null,
        },
        SECRET_KEY
      );
      cookies().set({
        name: "jwt_token",
        value: JSON.stringify(token),
        httpOnly: true,
        path: "/",
        secure: true,
      });
      return NextResponse.json({ token, result }, { status: 200 });
    }
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
