import { getEquipments } from "@/actions/equipment.action";

export async function EquipmentList() {
  const equipments = await getEquipments();

  return (
    <>
      <h1>Equipments</h1>
      <pre>{JSON.stringify(equipments, null, 2)}</pre>
    </>
  );
}
