"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getnFCMasters() {
  const nFCMasters = await prisma.nFCMasters.findMany();
  return nFCMasters;
}

export async function addnFCMaster(data: Prisma.NFCMastersCreateInput) {
  const newnFCMaster = await prisma.nFCMasters.create({
    data,
  });
  return newnFCMaster;
}

export async function updatenFCMaster(
  id: number,
  data: Prisma.NFCMastersUpdateInput
) {
  const updatenFCMaster = await prisma.nFCMasters.update({
    where: { Id: id },
    data,
  });
  return updatenFCMaster;
}

export async function deletenFCMaster(id: number) {
  try {
    const deletednFCMaster = await prisma.nFCMasters.delete({
      where: { Id: id },
    });
    return deletednFCMaster;
  } catch (error) {
    console.error("Error deleting nFCMaster:", error);
    throw new Error("Error deleting nFCMaster");
  }
}
