import { NextResponse } from "next/server";
import dbConnect from "@/db/db.config";
import Coupon from "@/model/coupen.schema";
import Claim from "@/model/claim.schema";

export async function GET(req) {
  try {
    await dbConnect();

    // Get user identifiers
    const ip = req.headers.get("x-forwarded-for") || req.ip;
    const cookies = req.cookies.get("user");
    const userCookie =
      cookies?.value || Math.random().toString(36).substring(2);

    // Check previous claims
    const lastClaim = await Claim.findOne({
      $or: [{ ip }, { cookieId: userCookie }],
    }).sort({ claimedAt: -1 });

    // Enforce cooldown period (1 hour)
    if (lastClaim && Date.now() - new Date(lastClaim.claimedAt) < 3600000) {
      const cooldownEndTime = new Date(lastClaim.claimedAt).getTime() + 3600000;
      return NextResponse.json(
        { message: "Wait before claiming again.", cooldownEndTime },
        { status: 429 }
      );
    }

    // Get next available coupon
    const coupon = await Coupon.findOneAndUpdate(
      { claimedBy: null },
      { claimedBy: ip, claimedAt: new Date() },
      { new: true }
    );

    if (!coupon) {
      return NextResponse.json(
        { message: "No coupons available." },
        { status: 404 }
      );
    }

    // Record the claim
    await new Claim({ ip, cookieId: userCookie, claimedAt: new Date() }).save();

    // Set cookie and return coupon
    const response = NextResponse.json({
      message: "Coupon claimed!",
      code: coupon.code,
    });
    response.headers.set(
      "Set-Cookie",
      `user=${userCookie}; Path=/; HttpOnly; Max-Age=3600`
    );

    return response;
  } catch (error) {
    console.error("Error in claim handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
