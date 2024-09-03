"use server";

import { RequestEquipmentsFormSchema } from "@/components/forms/RequestEquipmentsForm";
import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
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
    const borrow = await prisma.borrow.create({
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
    return {
      success: true,
      log: borrow.id,
    };
  } catch (e) {
    return {
      success: false,
      log: "An unknown error occurred",
    };
  }
}

export async function updateBorrowStatus(borrowId: string, status: Status) {
  try {
    await prisma.borrow.update({ where: { id: borrowId }, data: { status } });
    revalidatePath(`/request/equipments/${borrowId}`);
    return {
      success: true,
      log: "Update Success",
    };
  } catch (error) {
    return {
      success: false,
      log: "An unknown error occurred",
    };
  }
}
