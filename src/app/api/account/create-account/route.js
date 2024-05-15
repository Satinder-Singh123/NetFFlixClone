import connectDB from "@/database";
import { Account } from "@/models/Account";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const { name, pin, uid } = await req.json();

    const isAccountAlreadyExixts = await Account.find({ uid, name });
    console.log(isAccountAlreadyExixts);
    const allAccounts = await Account.find({});

    if (isAccountAlreadyExixts && isAccountAlreadyExixts.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Please try with a different name",
      });
    }

    if (allAccounts && allAccounts.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can only add 4 accounts",
      });
    }

    const hasPin = await hash(pin, 12);
    const newlyCreatedAccount = await Account.create({
      name,
      pin: hasPin,
      uid,
    });
    if (newlyCreatedAccount) {
      return NextResponse.json({
        success: true,
        message: "Account created successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}
