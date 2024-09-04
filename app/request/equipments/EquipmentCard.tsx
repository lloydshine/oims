"use client";

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
import { AvailabilityBadge } from "@/components/main/AvailabilityBadge";

export function EquipmentCard({
  equipment,
  addItem,
}: {
  equipment: Equipment;
  addItem: (id: any, e: any) => void;
}) {
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [borrow, setBorrow] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const count = await getUnreturnedApprovedEquipmentCount(equipment.id);
      setBorrowedCount(count);
    };
    fetch();
  }, []);

  const handleClick = (e: any) => {
    addItem(equipment.id, e);
    setBorrow(borrow + 1);
  };

  return (
    <Card className="w-[300px] h-min rounded-xl">
      <CardContent
        className="h-[300px] flex flex-col justify-between py-2"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.289), rgba(0, 0, 0, 0.873)), url('${equipment.imageUrl}') no-repeat center center / cover`,
        }}
      >
        <AvailabilityBadge isAvailable={equipment.isAvailable} />
        <div className="text-white flex justify-between items-center w-full">
          <div>
            <h1 className="font-semibold">{equipment.name}</h1>
            <p className="text-white/50">{equipment.brand}</p>
            <p className="text-white/50">
              Available : {equipment.quantity - borrowedCount}
            </p>
          </div>
          <div>
            <Button
              disabled={equipment.quantity - borrowedCount == borrow}
              onClick={handleClick}
            >
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
