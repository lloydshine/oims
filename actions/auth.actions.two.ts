"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { loginFormSchema } from "@/app/(auth)/login/page";
import { Prisma } from "@prisma/client";

export async function login(data: z.infer<typeof loginFormSchema>) {
  const existingUser = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }
  const validPassword = await bcrypt.compare(
    data.password,
    existingUser.password
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/admin/dashboard");
}

export async function register(data: any) {
  const saltRounds = 10; // Adjust as needed
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: passwordHash,
        role: data.role,
        assignedOffice: "GUIDANCE",
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log("Username already taken");
      }
    }
    return {
      error: "An unknown error occurred",
    };
  }
  redirect("/admin/users");
}
