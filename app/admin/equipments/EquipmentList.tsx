import { getEquipments } from "@/actions/equipment.action";
import { DataTable } from "@/components/data-table";
import { equipmentColumns } from "./columns";

export async function EquipmentList() {
  const equipments = await getEquipments();

  return (
    <>
      <h1>Equipments</h1>
      <DataTable columns={equipmentColumns} data={equipments} />
    </>
  );
}
