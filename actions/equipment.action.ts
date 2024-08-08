"use server";

import prisma from "@/lib/db";

export async function getEquipments() {
  try {
    const equipments = await prisma.equipment.findMany();
    return equipments;
  } catch (error) {
    return [];
  }
}
