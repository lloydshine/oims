"use server";

import prisma from "@/lib/db";
import { ActionResult } from "@/lib/form";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getDepartments() {
  try {
    const department = await prisma.department.findMany();
    return department;
  } catch (error) {
    return [];
  }
}

export async function createDepartment(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const shortName = formData.get("shortName") as string;
  try {
    await prisma.department.create({
      data: {
        name,
        shortName,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Department already exist",
        };
      }
    }
    console.log(e);

    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/departments");
}
