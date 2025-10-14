import { getPool } from "@/helper/dbConnection";
import { NextRequest, NextResponse } from "next/server";
// // async function generateStaticParams() {
// //   return [
// //     { action: "cancel" },
// //     { action: "decline" },
// //     { action: "accept" },
// //     { action: "maybe" },
// //   ];
// // }

export async function POST(request: NextRequest, res: NextResponse) {
  const requestBody = await request.json();
  const { action, id } = requestBody;
  const pool = getPool();
  const values = [action, id];
  try {
    await pool.query(
      `update meetings set action=$1, end_date=now() where id=$2`,
      values
    );
    return NextResponse.json({}, { status: 200 });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
