import { getEquipments } from "@/actions/equipment.action";
import { EquipmentCard } from "./EquipmentCard";

export async function EquipmentList() {
  const equipments = await getEquipments();

  return (
    <>
      <h1>Equipments</h1>
      <section className="flex flex-wrap max-h-[400px] h-[400px] gap-2">
        {equipments.map((equipment) => (
          <EquipmentCard equipment={equipment} key={equipment.id} />
        ))}
      </section>
    </>
  );
}
