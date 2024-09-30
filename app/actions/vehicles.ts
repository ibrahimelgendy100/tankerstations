"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
//try catch
export async function getVehicles() {
  try {
    const vehicles = await prisma.vehicles.findMany();
    return vehicles;
  } catch (error) {
    console.error("Prisma error fetching vehicles:", error);
    throw new Error("Database query failed");
  }
}

export async function addVehicle(data: Prisma.VehiclesCreateInput) {
  const newVehicle = await prisma.vehicles.create({
    data,
  });
  return newVehicle;
}

export async function updateVehicle(
  id: number,
  data: Prisma.VehiclesUpdateInput
) {
  const updateVehicle = await prisma.vehicles.update({
    where: { Id: id },
    data,
  });
  return updateVehicle;
}

export async function deleteVehicle(id: number) {
  try {
    const deletedVehicle = await prisma.vehicles.delete({
      where: { Id: id },
    });
    return deletedVehicle;
  } catch (error) {
    console.error("Error deleting Vehicle:", error);
    throw new Error("Error deleting Vehicle");
  }
}
