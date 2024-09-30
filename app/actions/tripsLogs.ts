"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getTripsLogs() {
  const tripsLogs = await prisma.tripsLogs.findMany();
  return tripsLogs;
}

export async function addTripsLog(data: Prisma.TripsLogsCreateInput) {
  const newTripsLog = await prisma.tripsLogs.create({
    data,
  });
  return newTripsLog;
}

export async function updateTripsLog(
  id: number,
  data: Prisma.TripsLogsUpdateInput
) {
  const updateTripsLog = await prisma.tripsLogs.update({
    where: { Id: id },
    data,
  });
  return updateTripsLog;
}

export async function deleteTripsLog(id: number) {
  try {
    const deletedTripsLog = await prisma.tripsLogs.delete({
      where: { Id: id },
    });
    return deletedTripsLog;
  } catch (error) {
    console.error("Error deleting TripsLog:", error);
    throw new Error("Error deleting TripsLog");
  }
}
