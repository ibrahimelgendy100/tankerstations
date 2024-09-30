import { deletenFCMaster, getnFCMasters, updatenFCMaster } from "@/app/actions/nFCMasters";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const nFC = await prisma.nFCMasters.findUnique({
        where: { Id: Number(id) },
      });
      if (!nFC) {
        return NextResponse.json({ error: true, message: "nFC not found" });
      }
      return NextResponse.json(nFC);
    } else {
      const info = await getnFCMasters();
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
    const updatedNFC = await updatenFCMaster(Number(id), body);
    if (!updatedNFC) {
      return NextResponse.json(
        { error: true, message: "nFC not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedNFC);
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
    const deletedNFC = await deletenFCMaster(Number(id));
    if (!deletedNFC) {
      return NextResponse.json(
        { error: true, message: "nFC not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "nFC deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
