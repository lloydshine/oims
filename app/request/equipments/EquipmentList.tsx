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
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function EquipmentList({ control }: { control: any }) {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name: "items",
  });

  const addItem = (equipmentId: string, e: any) => {
    e.preventDefault();

    // Find the existing item index in the fields array
    const existingItemIndex = fields.findIndex(
      (item) => item.equipmentId === equipmentId
    );

    // Find the equipment object from the equipments state
    const equipment = equipments.find((eq) => eq.id === equipmentId);

    if (!equipment) {
      // Equipment not found in the state, handle the error
      console.error("Equipment not found");
      return;
    }
    if (existingItemIndex !== -1) {
      // Item already exists, check if we can increment the quantity
      const existingItem = fields[existingItemIndex];
      // Check if the new quantity is within available stock
      if (existingItem.quantity < equipment.quantity) {
        // Update the item with incremented quantity
        update(existingItemIndex, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      } else {
        // Quantity exceeds available stock
        console.warn("Cannot add more items. Exceeds available stock.");
      }
    } else {
      // Item doesn't exist, append a new item with default quantity
      if (equipment.quantity > 0) {
        append({ equipmentId, quantity: 1 });
      } else {
        // Stock is not available to add a new item
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
      <ul>
        {equipments.map((equipment) => (
          <div key={equipment.id}>
            <li>
              {equipment.name} - {equipment.quantity} available
            </li>
            <Button onClick={(e) => addItem(equipment.id, e)}>Add</Button>
          </div>
        ))}

        {fields.map((field, i) => (
          <pre key={i}>{JSON.stringify(field, null, 2)}</pre>
        ))}
      </ul>
    </div>
  );
}
