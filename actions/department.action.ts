"use server";

import { DepartmentFormSchema } from "@/components/forms/DepartmentForm";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getDepartments() {
  try {
    const department = await prisma.department.findMany();
    return department;
  } catch (error) {
    return [];
  }
}

export async function getDepartment(id: string) {
  try {
    const department = await prisma.department.findUnique({
      where: { id },
    });
    return department;
  } catch (error) {
    return null;
  }
}

export async function createDepartment(
  data: z.infer<typeof DepartmentFormSchema>
) {
  try {
    await prisma.department.create({
      data: {
        name: data.name,
        shortName: data.shortname,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Department already stored",
        };
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  redirect("/admin/departments");
}

export async function updateDepartment(
  data: z.infer<typeof DepartmentFormSchema>
) {
  try {
    await prisma.department.update({
      where: { id: data.id },
      data: {
        name: data.name,
        shortName: data.shortname,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Department already stored",
        };
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  redirect("/admin/departments");
}
