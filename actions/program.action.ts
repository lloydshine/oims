"use server";

import prisma from "@/lib/db";
import { ActionResult } from "@/lib/form";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getPrograms() {
  try {
    const programs = await prisma.program.findMany();
    return programs;
  } catch (error) {
    return [];
  }
}

export async function getDepartmentPrograms(departmentId: string) {
  try {
    const programs = await prisma.program.findMany({
      where: { departmentId },
    });
    return programs;
  } catch (error) {
    return [];
  }
}

export async function createProgram(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const shortName = formData.get("shortName") as string;
  const departmentId = formData.get("departmentId") as string;
  try {
    await prisma.program.create({
      data: {
        name,
        shortName,
        departmentId,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Program already exist",
        };
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/departments");
}
