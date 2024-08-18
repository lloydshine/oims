import { getEquipments } from "@/actions/equipment.action";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export async function EquipmentLists() {
  const equipments = await getEquipments();
  return <DataTable columns={columns} data={equipments} />;
}
