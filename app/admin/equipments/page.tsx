import { Suspense } from "react";
import { EquipmentList } from "./EquipmentList";
import { EquipmentStatistics } from "./EquipmentStatistics";
import { BorrowList } from "./BorrowList";

export default async function EqipmentsPage() {
  return (
    <section className="flex flex-col gap-4">
      <Suspense fallback={<>Loading Statistics...</>}>
        <EquipmentStatistics />
      </Suspense>
      <Suspense fallback={<>Loading Requests...</>}>
        <BorrowList />
      </Suspense>
      <Suspense fallback={<>Loading Equipments...</>}>
        <EquipmentList />
      </Suspense>
    </section>
  );
}
