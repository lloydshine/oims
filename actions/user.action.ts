"use server";

import prisma from "@/lib/db";
import { ActionResult } from "@/lib/form";
import { Office, Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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

export async function createUser(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as UserRole;
  const assignedOffice = formData.get("assignedOffice") as Office;
  const firstName = formData.get("firstName") as string | null;
  const middleName = formData.get("middleName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const contactNumber = formData.get("contactNumber") as string | null;
  const email = formData.get("email") as string | null;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    //// Create a new user
    await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        role,
        assignedOffice,
        firstName,
        middleName,
        lastName,
        contactNumber,
        email,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Username already taken",
        };
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/users");
}
