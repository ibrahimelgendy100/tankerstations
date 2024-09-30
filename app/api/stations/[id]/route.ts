import {
  deleteFillingStation,
  getStations,
  updateStation,
} from "@/app/actions/stations";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const station = await prisma.fillingStations.findUnique({
        where: { Id: Number(id) },
      });
      if (!station) {
        return NextResponse.json({ error: true, message: "Station not found" });
      }
      return NextResponse.json(station);
    } else {
      const info = await getStations();
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
    const updatedStation = await updateStation(Number(id), body);
    if (!updatedStation) {
      return NextResponse.json(
        { error: true, message: "Station not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedStation);
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
    const deletedStation = await deleteFillingStation(Number(id));
    if (!deletedStation) {
      return NextResponse.json(
        { error: true, message: "Station not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Station deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
