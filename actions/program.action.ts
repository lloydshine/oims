"use server";

import { ProgramFormSchema } from "@/components/forms/ProgramForm";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export async function createProgram(data: z.infer<typeof ProgramFormSchema>) {
  try {
    await prisma.program.create({
      data: {
        name: data.name,
        shortName: data.shortname,
        departmentId: data.departmentId,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Program already stored",
        };
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  redirect(`/admin/departments/${data.departmentId}`);
}
