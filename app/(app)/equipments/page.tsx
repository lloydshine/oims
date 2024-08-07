import { ModeToggle } from "@/components/theme-provider";

export default function EqipmentsPage() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Equipments</h1>
        <ModeToggle />
      </header>
    </section>
  );
}
