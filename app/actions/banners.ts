"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getBanners() {
  const banners = await prisma.banners.findMany();
  return banners;
}

export async function addBanner(data: Prisma.BannersCreateInput) {
  const newbanner = await prisma.banners.create({
    data,
  });
  return newbanner;
}

export async function updatebanner(
  id: number,
  data: Prisma.BannersUpdateInput
) {
  const updatebanner = await prisma.banners.update({
    where: { Id: id },
    data,
  });
  return updatebanner;
}

export async function deleteBanner(id: number) {
  try {
    const deletedBanner = await prisma.banners.delete({
      where: { Id: id },
    });
    return deletedBanner;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw new Error("Error deleting banner");
  }
}
