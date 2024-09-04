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

export async function deleteEquipment(id: string) {
  try {
    await prisma.borrowEquipment.deleteMany({
      where: { equipmentId: id },
    });
    await prisma.equipment.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/equipments");
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
    // Calculate the sum of quantities for borrowed items that are approved and not yet returned
    const result = await prisma.borrowEquipment.aggregate({
      _sum: {
        quantity: true, // Aggregate the sum of quantities
      },
      where: {
        equipmentId,
        returned: false, // Filter for items that haven't been returned
        borrow: {
          status: "Approved", // Filter for borrows that are approved
        },
      },
    });

    return result._sum.quantity || 0; // Return the summed quantity or 0 if none
  } catch (error) {
    console.error(
      "Error fetching sum of unreturned approved equipment quantities:",
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
        imageUrl: data.imageUrl,
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
        imageUrl: data.imageUrl,
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
