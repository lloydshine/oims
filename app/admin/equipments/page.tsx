import { Suspense } from "react";
import { EquipmentLists } from "./EquipmentLists";
import { EquipmentStatistics } from "./EquipmentStatistics";

export default async function EqipmentsPage() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Equipments</h1>
      </header>
      <br />
      <Suspense fallback={<>Loading Statistics...</>}>
        <EquipmentStatistics />
      </Suspense>
      <Suspense fallback={<>Loading Equipments...</>}>
        <EquipmentLists />
      </Suspense>
    </section>
  );
}
