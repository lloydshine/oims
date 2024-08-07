import { Sidebar } from "@/components/app/Sidebar";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-secondary p-10">{children}</div>
    </main>
  );
}
