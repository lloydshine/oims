"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { loginFormSchema } from "@/components/forms/LoginForm";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Office, Prisma, UserRole } from "@prisma/client";
import { UserFormSchema } from "@/components/forms/UserForm";
import { ActionResult } from "@/lib/form";

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

export async function register(data: z.infer<typeof UserFormSchema>) {
  const saltRounds = 10; // Adjust as needed
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: passwordHash,
        role: data.role as UserRole,
        assignedOffice: data.assignedOffice as Office,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        contactNumber: data.contactNumber,
      },
    });
    // const session = await lucia.createSession(user.id, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes
    // );
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

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}

export async function updateUser(data: z.infer<typeof UserFormSchema>) {
  const saltRounds = 10; // Adjust as needed
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  try {
    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        username: data.username,
        password: passwordHash,
        role: data.role as UserRole,
        assignedOffice: data.assignedOffice as Office,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        contactNumber: data.contactNumber,
      },
    });
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
