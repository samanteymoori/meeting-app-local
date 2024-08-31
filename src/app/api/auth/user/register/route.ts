import { getPool } from "@/helper/dbConnection";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = await req.json();
  const { first_name, last_name, email, confirm_password, password } =
    requestBody;
  if (password !== confirm_password) {
    throw new Error("password is incorrect");
  }
  const values = [email, first_name, last_name, password];
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await pool.query(
      `INSERT INTO public.users(
        email, first_name, last_name,password_hash)
       VALUES ($1, $2, $3,crypt($4, gen_salt('bf')))
       RETURNING id;`,
      values
    );
    const id = result.rows?.[0]?.id;
    await pool.query(
      `insert into user_profiles (user_id)        
         VALUES ($1)`,
      [id]
    );
    await pool.query(
      `insert into user_profile_pictures (user_id,is_primary)        
           VALUES ($1,true)`,
      [id]
    );
    // Authenticate user
    if (result.rows.length) {
      // Create JWT token
      const token = jwt.sign(
        {
          username: requestBody.email,
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

      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 403 }
      );
    }
  } catch (e) {
    console.log(e.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
