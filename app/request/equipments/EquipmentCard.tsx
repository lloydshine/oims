import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Equipment } from "@prisma/client";
import { getUnreturnedApprovedEquipmentCount } from "@/actions/equipment.action";
import { useEffect, useState } from "react";

export function EquipmentCard({
  equipment,
  addItem,
}: {
  equipment: Equipment;
  addItem: (id: any, e: any) => void;
}) {
  const [borrowedCount, setBorrowedCount] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      const count = await getUnreturnedApprovedEquipmentCount(equipment.id);
      setBorrowedCount(count);
    };
    fetch();
  }, []);
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex-row items-center justify-between">
        <h1>{equipment.name}</h1>
        <Badge>{equipment.isAvailable ? "Available" : "Not Available"}</Badge>
      </CardHeader>
      <CardContent className="h-[300px]">
        <p className="text-muted-foreground">{equipment.brand}</p>
        <Image
          src={equipment.imageUrl ? equipment.imageUrl : "/vercel.svg"}
          alt="Photo by Drew Beamer"
          className="rounded-md"
          width={300}
          height={300}
        />
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          disabled={equipment.quantity == borrowedCount}
          onClick={(e) => addItem(equipment.id, e)}
        >
          Add
        </Button>
        <p>Available : {equipment.quantity - borrowedCount}</p>
      </CardFooter>
    </Card>
  );
}
