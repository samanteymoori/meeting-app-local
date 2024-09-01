import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = await req.json();
  const { location, id } = requestBody;
  console.log({ location, id });
  const values = [location.x, location.y, id];
  const pool = getPool();
  const client = await pool.connect();
  try {
    await pool.query(
      `update user_profiles set location=POINT($1,$2) where user_id=$3`,
      values
    );

    return NextResponse.json({ result: "success" }, { status: 200 });
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
