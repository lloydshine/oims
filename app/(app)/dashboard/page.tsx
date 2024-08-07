import { ModeToggle } from "@/components/theme-provider";

export default async function AppPage() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ModeToggle />
      </header>
      <section className="p-10"></section>
    </section>
  );
}
