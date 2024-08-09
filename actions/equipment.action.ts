"use server";

import prisma from "@/lib/db";
import { ActionResult } from "@/lib/form";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getEquipments() {
  try {
    const equipments = await prisma.equipment.findMany();
    return equipments;
  } catch (error) {
    return [];
  }
}

export async function createEquipment(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const isAvailable = formData.get("isAvailable") == "true";
  const quantity = parseInt(formData.get("quantity") as string);
  try {
    //// Create a new user
    await prisma.equipment.create({
      data: {
        name,
        description,
        isAvailable,
        quantity,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Item already stored",
        };
      }
    }
    console.log(e);

    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/equipments");
}
