import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@/types/ProfileType";

export async function POST(request: NextRequest) {
  const pool = getPool();
  try {
    const requestBody = await request.json();
    const {
      name,
      location,
      address,
      phone,
      working_hours_start,
      working_hours_end,
    } = requestBody;

    const values = [
      name,
      location.lat,
      location.lng,
      address,
      phone,
      working_hours_start,
      working_hours_end,
    ];
    console.log(JSON.stringify(values));
    const result = await pool.query(
      `INSERT INTO public.places(
         name, location, address, phone, working_hours_start, working_hours_end)
        VALUES ( $1, POINT($2,$3), $4, $5, $6, $7)
        RETURNING id;`,
      values
    );
    const place_id = result.rows[0]?.id;

    return NextResponse.json({ place_id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
