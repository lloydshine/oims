// @ts-nocheck
"use client";

import { getEquipments } from "@/actions/equipment.action";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Equipment } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EquipmentCard } from "./EquipmentCard";

export default function EquipmentList({ control }: { control: any }) {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name: "items",
  });

  const addItem = (equipmentId: string, e: any) => {
    e.preventDefault();
    const existingItemIndex = fields.findIndex(
      (item) => item.equipmentId === equipmentId
    );
    const equipment = equipments.find((eq) => eq.id === equipmentId);
    if (!equipment) {
      console.error("Equipment not found");
      return;
    }
    if (existingItemIndex !== -1) {
      const existingItem = fields[existingItemIndex];
      if (existingItem.quantity < equipment.quantity) {
        update(existingItemIndex, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      } else {
        console.warn("Cannot add more items. Exceeds available stock.");
      }
    } else {
      if (equipment.quantity > 0) {
        append({ equipmentId, quantity: 1 });
      } else {
        console.warn("Cannot add item. Stock not available.");
      }
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const equipments = await getEquipments();
        setEquipments(equipments);
      } catch (error) {
        console.error("Failed to fetch equipments:", error);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };

    fetchEquipments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Equipment List</h1>
      <section className="flex flex-wrap gap-4">
        {equipments.map((equipment) => (
          <Suspense fallback={<>Loading Item..</>} key={equipment.id}>
            <EquipmentCard equipment={equipment} addItem={addItem} />
          </Suspense>
        ))}
      </section>
      {fields.map((field, i) => (
        <pre key={i}>{JSON.stringify(field, null, 2)}</pre>
      ))}
    </div>
  );
}
