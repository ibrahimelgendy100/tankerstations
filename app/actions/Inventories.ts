"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getInventories() {
  const inventories = await prisma.inventories.findMany();
  return inventories;
}

export async function addInventory(data: Prisma.InventoriesCreateInput) {
  const newInventory = await prisma.inventories.create({
    data,
  });
  return newInventory;
}

export async function updateInventory(id: number, data: Prisma.InventoriesUpdateInput) {
  const updateInventory = await prisma.inventories.update({
    where: { Id: id },
    data,
  });
  return updateInventory;
}

export async function deleteInventory(id: number) {
  try {
    const deletedInventory = await prisma.inventories.delete({
      where: { Id: id },
    });
    return deletedInventory;
  } catch (error) {
    console.error("Error deleting Inventory:", error);
    throw new Error("Error deleting Inventory");
  }
}
