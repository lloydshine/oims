import { Sidebar } from "@/components/main/Sidebar";
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
    <main className="flex h-screen">
      <Sidebar />
      <ScrollArea className="flex flex-col w-full max-h-screen p-10 bg-secondary">
        {children}
      </ScrollArea>
      <Toaster />
    </main>
  );
}
