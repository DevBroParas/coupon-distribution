import { NextResponse } from "next/server";
import dbConnect from "@/db/db.config";
import Coupon from "@/model/coupen.schema";

export async function GET() {
  try {
    await dbConnect();

    await Coupon.insertMany([
      { code: "COUPON1" },
      { code: "COUPON2" },
      { code: "COUPON3" },
      { code: "COUPON4" },
    ]);

    return NextResponse.json({ message: "Coupons seeded!" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { message: "Error seeding coupons", error: error.message },
      { status: 500 }
    );
  }
}
