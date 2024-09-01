import { getEquipment, updateEquipment } from "@/actions/equipment.action";
import { EquipmentForm } from "@/components/forms/EquipmentForm";

export default async function EquipmentPage({ params }: { params: any }) {
  const equipment = await getEquipment(params.id);
  if (!equipment) return <>Not Found</>;
  return (
    <EquipmentForm
      defaultValues={{
        id: equipment.id,
        name: equipment.name,
        brand: equipment.brand,
        price: equipment.price.toString(),
        quantity: equipment.quantity.toString(),
        isAvailable: equipment.isAvailable ? "true" : "false",
        imageUrl: equipment.imageUrl ? equipment.imageUrl : undefined,
      }}
      onSubmit={updateEquipment}
    />
  );
}
