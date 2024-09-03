import { Card, CardContent } from "@/components/ui/card";
import { BorrowEquipment, Equipment } from "@prisma/client";

export type BorrowedEquipment = BorrowEquipment & {
  equipment: Equipment;
};

export default function BorrowedEquipmentCard({
  borrow,
}: {
  borrow: BorrowedEquipment;
}) {
  return (
    <Card className="w-[250px] h-min rounded-xl">
      <CardContent
        className="h-[250px] flex items-end"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.289), rgba(0, 0, 0, 0.873)), url('${borrow.equipment.imageUrl}') no-repeat center center / cover`,
        }}
      >
        <div className="text-white flex justify-between items-center w-full">
          <div>
            <h1 className="font-semibold">{borrow.equipment.name}</h1>
            <p className="text-white/50">{borrow.equipment.brand}</p>
          </div>
          <div>
            <p>x {borrow.quantity}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
