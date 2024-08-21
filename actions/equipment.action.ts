"use server";

import { EquipmentFormSchema } from "@/components/forms/EquipmentForm";
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

export async function getEquipment(id: string) {
  try {
    const equipment = await prisma.equipment.findUnique({ where: { id } });
    return equipment;
  } catch (error) {
    return null;
  }
}

export async function getBorrowedEquipments(borrowId: string) {
  try {
    const equipments = await prisma.borrowEquipment.findMany({
      where: { borrowId },
    });
    return equipments;
  } catch (error) {
    return [];
  }
}

export async function updateEquipment(
  data: z.infer<typeof EquipmentFormSchema>
) {
  try {
    await prisma.equipment.update({
      where: {
        id: data.id,
      },
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
      if (e.code === "P2025") {
        return {
          error: "Item not found",
        };
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  redirect("/admin/equipments");
}

export async function createEquipment(
  data: z.infer<typeof EquipmentFormSchema>
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
