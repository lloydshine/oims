import { Badge } from "@/components/ui/badge";
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
    <Card className="w-[300px]">
      <CardHeader className="flex-row items-center justify-between">
        <h1>{equipment.name}</h1>
        <Badge>{equipment.isAvailable ? "Available" : "Not Available"}</Badge>
      </CardHeader>
      <CardContent>
        <p>{equipment.description}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={!equipment.isAvailable}>Add</Button>
      </CardFooter>
    </Card>
  );
}
