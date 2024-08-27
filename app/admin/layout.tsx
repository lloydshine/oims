import { Sidebar } from "@/components/main/Sidebar";
import { Topbar } from "@/components/main/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
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
    <main>
      <Topbar user={user} />
      <section className="flex">
        <Sidebar user={user} />
        <ScrollArea className="flex-1 max-h-screen pt-24 px-5">
          {children}
        </ScrollArea>
      </section>
    </main>
  );
}
