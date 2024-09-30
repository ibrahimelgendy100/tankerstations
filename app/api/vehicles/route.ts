import prisma from "@/lib/db";
import {  NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// function serializeBigInt(obj: unknown): unknown {
//   if (Array.isArray(obj)) {
//     return obj.map((item) => serializeBigInt(item));
//   } else if (obj !== null && typeof obj === "object") {
//     return Object.fromEntries(
//       Object.entries(obj).map(([key, value]) => [
//         key,
//         typeof value === "bigint" ? Number(value) : serializeBigInt(value),
//       ])
//     );
//   }
//   return obj; // Return the value as is if it's not an object or array
// }

export async function GET() {
  try {
    const info = await prisma.vehicles.findMany();

    if (!info) {
      return NextResponse.json({ error: true });
    }
    // Serialize BigInt values
    //const serializedInfo = serializeBigInt(info);
    return NextResponse.json(info);
  } catch (error) {
    console.error("Error while processing request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
