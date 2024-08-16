"use server";

import { addEquipmentFormSchema } from "@/components/forms/AddEquipmentForm";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getEquipments() {
  try {
    const equipments = await prisma.equipment.findMany();
    return equipments;
  } catch (error) {
    return [];
  }
}

export async function createEquipment(
  data: z.infer<typeof addEquipmentFormSchema>
) {
  try {
    await prisma.equipment.create({
      data: {
        name: data.name,
        brand: data.brand,
        isAvailable: data.isAvailable == "true",
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
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
    return {
      error: "An unknown error occurred",
    };
  }
  redirect("/admin/equipments");
}
