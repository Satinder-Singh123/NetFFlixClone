import connectDB from "@/database";
import { Favorites } from "@/models/Favorite";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Favorite item ID is mandatary",
      });
    }

    const deleteFavoriteItem = await Favorites.findByIdAndDelete(id);

    if (deleteFavoriteItem) {
      return NextResponse.json({
        success: true,
        message: "Remove form your list",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went Wrong",
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
