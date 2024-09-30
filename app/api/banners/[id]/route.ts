import { deleteBanner, getBanners, updatebanner } from "@/app/actions/banners";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const banner = await prisma.banners.findUnique({
        where: { Id: Number(id) },
      });
      if (!banner) {
        return NextResponse.json({ error: true, message: "banner not found" });
      }
      return NextResponse.json(banner);
    } else {
      const info = await getBanners();
      if (!info) {
        return NextResponse.json({ error: true });
      }
      return NextResponse.json(info);
    }
  } catch (error) {
    console.error("Error while processing request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}



export const PUT = async (request: Request ,{ params }: { params: { id?: string } }) => {
  const { id } = params;
  if (!id) {
    return new NextResponse("ID is required for updating", { status: 400 });
  }
  try {
    const body = await request.json();
    const updatedBanner = await updatebanner(Number(id), body);
    if (!updatedBanner) {
      return NextResponse.json(
        { error: true, message: "Banner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error("Error while processing PUT request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const DELETE = async (request: Request,{ params }: { params: { id?: string } }) => {
  const { id } = params;
  if (!id) {
    return new NextResponse("ID is required for deleting", { status: 400 });
  }
  try {
    const deletedBanner = await deleteBanner(Number(id));
    if (!deletedBanner) {
      return NextResponse.json(
        { error: true, message: "Banner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
