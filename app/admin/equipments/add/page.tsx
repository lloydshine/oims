import { createEquipment } from "@/actions/equipment.action";
import { EquipmentForm } from "@/components/forms/EquipmentForm";

export default function AddEquipmentPage() {
  return (
    <section>
      <EquipmentForm onSubmit={createEquipment} />
    </section>
  );
}
