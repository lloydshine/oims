import { AvailabilityBadge } from "@/components/main/AvailabilityBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Equipment } from "@prisma/client";

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <Card className="w-[400px] h-min rounded-xl">
      <CardContent
        className="h-[300px] flex items-end"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.289), rgba(0, 0, 0, 0.873)), url('${equipment.imageUrl}') no-repeat center center / cover`,
        }}
      >
        <div className="text-white flex justify-between items-center w-full">
          <div>
            <h1 className="font-semibold">{equipment.name}</h1>
            <p className="text-white/50">{equipment.brand}</p>
          </div>
          <AvailabilityBadge isAvailable={equipment.isAvailable} />
        </div>
      </CardContent>
    </Card>
  );
}
