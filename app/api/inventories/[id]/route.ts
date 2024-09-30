
import { deleteInventory, getInventories, updateInventory } from "@/app/actions/Inventories";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const inventory = await prisma.inventories.findUnique({
        where: { Id: Number(id) },
      });
      if (!inventory) {
        return NextResponse.json({ error: true, message: "Inventory not found" });
      }
      return NextResponse.json(inventory);
    } else {
      const info = await getInventories();
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
    const updatedInventory = await updateInventory(Number(id), body);
    if (!updatedInventory) {
      return NextResponse.json(
        { error: true, message: "Inventory not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedInventory);
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
    const deletedInventory = await deleteInventory(Number(id));
    if (!deletedInventory) {
      return NextResponse.json(
        { error: true, message: "Inventory not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
