
import { deleteVehicle, getVehicles, updateVehicle } from "@/app/actions/vehicles";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const vehicle = await prisma.vehicles.findUnique({
        where: { Id: Number(id) },
      });
      if (!vehicle) {
        return NextResponse.json({ error: true, message: "vehicle not found" });
      }
      return NextResponse.json(vehicle);
    } else {
      const info = await getVehicles();
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
    const updatedVehicle = await updateVehicle(Number(id), body);
    if (!updatedVehicle) {
      return NextResponse.json(
        { error: true, message: "vehicle not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedVehicle);
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
    const deletedVehicle = await deleteVehicle(Number(id));
    if (!deletedVehicle) {
      return NextResponse.json(
        { error: true, message: "vehicle not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
