"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getStories() {
  const stories = await prisma.stories.findMany();
  return stories;
}

export async function addStory(data: Prisma.StoriesCreateInput) {
  const newStory= await prisma.stories.create({
    data,
  });
  return newStory;
}

export async function updateStory(
  id: number,
  data: Prisma.StoriesUpdateInput
) {
  const updateStorie = await prisma.stories.update({
    where: { Id: id },
    data,
  });
  return updateStorie;
}

export async function deleteStory(id: number) {
  try {
    const deletedStory = await prisma.stories.delete({
      where: { Id: id },
    });
    return deletedStory;
  } catch (error) {
    console.error("Error deleting Story:", error);
    throw new Error("Error deleting Story");
  }
}
