
import { deleteInvoice, getInvoices, updateInvoice } from "@/app/actions/invoices";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const invoice = await prisma.invoices.findUnique({
        where: { Id: Number(id) },
      });
      if (!invoice) {
        return NextResponse.json({ error: true, message: "Invoice not found" });
      }
      return NextResponse.json(invoice);
    } else {
      const info = await getInvoices();
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
    const updatedInvoice = await updateInvoice(Number(id), body);
    if (!updatedInvoice) {
      return NextResponse.json(
        { error: true, message: "Invoice not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedInvoice);
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
    const deletedInvoice = await deleteInvoice(Number(id));
    if (!deletedInvoice) {
      return NextResponse.json(
        { error: true, message: "Invoice not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
