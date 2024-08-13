"use server";

import prisma from "@/lib/db";
import { ActionResult } from "@/lib/form";
import { redirect } from "next/navigation";

export async function getBorrows() {
  try {
    const borrows = await prisma.borrow.findMany();
    return borrows;
  } catch (error) {
    return [];
  }
}

export async function createBorrow(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const borrower = formData.get("borrower") as string;
  const event = formData.get("event") as string;
  const departmentId = formData.get("event") as string;
  try {
    await prisma.borrow.create({
      data: {
        borrower,
        event,
        departmentId,
        BorrowEquipment: { create: [{ equipmentId: "1", quantity: 5 }] },
      },
    });
  } catch (e) {
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/");
}
