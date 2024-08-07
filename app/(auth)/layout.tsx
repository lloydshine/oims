import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return <main>{children}</main>;
}
