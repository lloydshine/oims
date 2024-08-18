"use server";

import prisma from "@/lib/db";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        assignedOffice: "asc", // You can change this to 'desc' if you want to sort in descending order
      },
    });
    return users;
  } catch (error) {
    return [];
  }
}

export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
}
