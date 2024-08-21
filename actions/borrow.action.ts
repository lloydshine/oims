"use server";

import { RequestEquipmentsFormSchema } from "@/components/forms/RequestEquipmentsForm";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getBorrows() {
  try {
    const borrows = await prisma.borrow.findMany();
    return borrows;
  } catch (error) {
    return [];
  }
}

export async function getBorrow(id: string) {
  try {
    const borrow = await prisma.borrow.findUnique({ where: { id } });
    return borrow;
  } catch (error) {
    return null;
  }
}

export async function createBorrow(
  data: z.infer<typeof RequestEquipmentsFormSchema>
) {
  try {
    await prisma.borrow.create({
      data: {
        borrower: data.borrower,
        event: data.event,
        departmentId: data.department,
        BorrowEquipment: {
          create: data.items.map((equipment) => ({
            equipmentId: equipment.equipmentId,
            quantity: equipment.quantity,
          })),
        },
      },
    });
  } catch (e) {
    return {
      error: "An unknown error occurred",
    };
  }
  redirect("/");
}
