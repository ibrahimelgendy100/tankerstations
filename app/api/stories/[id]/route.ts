
import { deleteStory, getStories, updateStory } from "@/app/actions/stories";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
   const { id } = params;  
  try {
    if (id) {
      const story = await prisma.stories.findUnique({
        where: { Id: Number(id) },
      });
      if (!story) {
        return NextResponse.json({ error: true, message: "story not found" });
      }
      return NextResponse.json(story);
    } else {
      const info = await getStories();
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
    const updatedStory = await updateStory(Number(id), body);
    if (!updatedStory) {
      return NextResponse.json(
        { error: true, message: "Story not found"},
        { status: 404 }
      );
    }
    return NextResponse.json(updatedStory);
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
    const deletedStory = await deleteStory(Number(id));
    if (!deletedStory) {
      return NextResponse.json(
        { error: true, message: "story not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Error while processing DELETE request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
