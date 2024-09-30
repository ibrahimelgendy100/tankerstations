import { deleteStationBay, getStationBays, updateStationBay } from "@/app/actions/stationBays";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const bay = await prisma.stationBays.findUnique({
        where: { Id: Number(id) },
      });
      if (!bay) {
        return NextResponse.json({ error: true, message: "bay not found" });
      }
      return NextResponse.json(bay);
    } else {
      const info = await getStationBays();
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
    const updatedBay = await updateStationBay(Number(id), body);
    if (!updatedBay) {
      return NextResponse.json(
        { error: true, message: "bay not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedBay);
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
    const deletedBay = await deleteStationBay(Number(id));
    if (!deletedBay) {
      return NextResponse.json(
        { error: true, message: "bay not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Bay deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
