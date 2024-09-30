
import { deleteAppConfig, getAppConfigs, updateAppConfig } from "@/app/actions/appConfig";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const appConfig = await prisma.appConfigs.findUnique({
        where: { Id: Number(id) },
      });
      if (!appConfig) {
        return NextResponse.json({ error: true, message: "appConfig not found" });
      }
      return NextResponse.json(appConfig);
    } else {
      const info = await getAppConfigs();
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
    const updatedAppConfig = await updateAppConfig(Number(id), body);
    if (!updatedAppConfig) {
      return NextResponse.json(
        { error: true, message: "AppConfig not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedAppConfig);
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
    const deletedAppConfig = await deleteAppConfig(Number(id));
    if (!deletedAppConfig) {
      return NextResponse.json(
        { error: true, message: "AppConfig not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "AppConfig deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
