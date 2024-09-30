"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getStationBays() {
  const stationBays = await prisma.stationBays.findMany();
  return stationBays;
}

export async function addStationBay(data: Prisma.StationBaysCreateInput) {
  const newbay = await prisma.stationBays.create({
    data,
  });
  return newbay;
}

export async function updateStationBay(id: number, data: Prisma.StationBaysUpdateInput) {
  const updatebay = await prisma.stationBays.update({
    where: { Id: id },
    data,
  });
  return updatebay;
}

export async function deleteStationBay(id: number) {
  try {
    const deletedStation = await prisma.stationBays.delete({
      where: { Id: id },
    });
    return deletedStation;
  } catch (error) {
    console.error("Error deleting station:", error);
    throw new Error("Error deleting filling station");
  }
}
