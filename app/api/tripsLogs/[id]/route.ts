import { deleteTripsLog, getTripsLogs, updateTripsLog } from "@/app/actions/tripsLogs";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const tripsLog = await prisma.tripsLogs.findUnique({
        where: { Id: Number(id) },
      });
      if (!tripsLog) {
        return NextResponse.json({ error: true, message: "tripsLog not found" });
      }
      return NextResponse.json(tripsLog);
    } else {
      const info = await getTripsLogs();
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
    const updatedTripsLog = await updateTripsLog(Number(id), body);
    if (!updatedTripsLog) {
      return NextResponse.json(
        { error: true, message: "TripsLog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedTripsLog);
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
    const deletedTripsLog = await deleteTripsLog(Number(id));
    if (!deletedTripsLog) {
      return NextResponse.json(
        { error: true, message: "TripsLog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "TripsLog deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
