"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getStations() {
  const fillingStations = await prisma.fillingStations.findMany();
  return fillingStations;
}

export async function addStation(data:Prisma.FillingStationsCreateInput) {
    const newStation = await prisma.fillingStations.create({
      data,
  })
  return newStation;
}

export async function updateStation(id:number, data: Prisma.FillingStationsUpdateInput) {
    const updateStation = await prisma.fillingStations.update({
      where:{Id:id},
    data,
  });
  return updateStation;
}

export async function deleteFillingStation(id: number) {
  try {
    const deletedStation = await prisma.fillingStations.delete({
      where: { Id: id },
    });
    return deletedStation;
  } catch (error) {
    console.error("Error deleting station:", error);
    throw new Error("Error deleting filling station");
  }
}