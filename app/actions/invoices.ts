"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getInvoices() {
  const invoices = await prisma.invoices.findMany();
  return invoices;
}

export async function addInvoice(data: Prisma.InvoicesCreateInput) {
  const newInvoice = await prisma.invoices.create({
    data,
  });
  return newInvoice;
}

export async function updateInvoice(
  id: number,
  data: Prisma.InvoicesUpdateInput
) {
  const updateInvoice = await prisma.invoices.update({
    where: { Id: id },
    data,
  });
  return updateInvoice;
}

export async function deleteInvoice(id: number) {
  try {
    const deletedInvoice = await prisma.invoices.delete({
      where: { Id: id },
    });
    return deletedInvoice;
  } catch (error) {
    console.error("Error deleting Invoice:", error);
    throw new Error("Error deleting Invoice");
  }
}
