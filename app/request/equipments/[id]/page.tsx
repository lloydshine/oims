import { getBorrow } from "@/actions/borrow.action";
import { getBorrowedEquipments } from "@/actions/equipment.action";

export default async function RequestPage({ params }: { params: any }) {
  const request = await getBorrow(params.id);
  if (!request) return;
  const equipments = await getBorrowedEquipments(request.id);
  return (
    <div>
      <pre>{JSON.stringify(request, null, 2)}</pre>
      <pre>{JSON.stringify(equipments, null, 2)}</pre>
    </div>
  );
}
