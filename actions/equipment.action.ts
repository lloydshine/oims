"use server";

import { EquipmentFormSchema } from "@/components/forms/EquipmentForm";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
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

export async function deleteEquipment(id: string) {
  try {
    await prisma.equipment.delete({ where: { id } });
    revalidatePath(`/admin/equipments/${id}`);
  } catch (error) {
    return null;
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

export async function getUnreturnedApprovedEquipmentCount(equipmentId: string) {
  try {
    const count = await prisma.borrowEquipment.count({
      where: {
        equipmentId,
        returned: false, // Filter for items that haven't been returned
        borrow: {
          status: "Approved", // Filter for borrows that are approved
        },
      },
    });
    return count;
  } catch (error) {
    console.error(
      "Error fetching count of unreturned approved equipments:",
      error
    );
    return 0;
  }
}

export async function getBorrowedEquipments(borrowId: string) {
  try {
    const equipments = await prisma.borrowEquipment.findMany({
      where: { borrowId },
      include: { equipment: true },
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
