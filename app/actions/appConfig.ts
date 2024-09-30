"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getAppConfigs() {
  const appConfigs = await prisma.appConfigs.findMany();
  return appConfigs;
} 

export async function addAppConfig(data: Prisma.AppConfigsCreateInput) {
  const newAppConfig = await prisma.appConfigs.create({
    data,
  });
  return newAppConfig;
}

export async function updateAppConfig(
  id: number,
  data: Prisma.AppConfigsUpdateInput
) {
  const updateAppConfig = await prisma.appConfigs.update({
    where: { Id: id },
    data,
  });
  return updateAppConfig;
}

export async function deleteAppConfig(id: number) {
  try {
    const deletedAppConfig = await prisma.appConfigs.delete({
      where: { Id: id },
    });
    return deletedAppConfig;
  } catch (error) {
    console.error("Error deleting AppConfig:", error);
    throw new Error("Error deleting AppConfig");
  }
}
