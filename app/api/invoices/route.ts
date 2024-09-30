import { getInvoices } from "@/app/actions/invoices";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const info = await getInvoices();
    if (!info) {
      return NextResponse.json({ error: true });
    }
    return NextResponse.json(info);
  } catch (error) {
    console.error("Error while processing request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
