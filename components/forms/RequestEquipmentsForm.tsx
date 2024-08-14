"use client";

import { Form } from "@/lib/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBorrow } from "@/actions/borrow.action";
import { useEffect, useState } from "react";
import { Department, Equipment } from "@prisma/client";
import { getDepartments } from "@/actions/department.action";
import { getEquipments } from "@/actions/equipment.action";
import { EquipmentCard } from "@/app/request/equipments/EquipmentCard";

export function RequestEquipmentsForm() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDepartments = await getDepartments();
      setDepartments(fetchedDepartments);
      const fetchedEquipments = await getEquipments();
      setEquipments(fetchedEquipments);
    };
    fetchData();
  }, []);

  return (
    <Form action={createBorrow}>
      <div className="flex flex-col gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Borrower&apos;s Name</Label>
          <Input
            type="text"
            id="borrower"
            name="borrower"
            placeholder="Borrower"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Event Name</Label>
          <Input type="text" id="event" name="event" placeholder="Event" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="isAvailable">Department</Label>
          <Select name="isAvailable">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <section>
          <h1 className="mb-5 font-bold">Equipments</h1>
          <div className="flex gap-4 flex-wrap">
            {equipments.map((equipment) => (
              <EquipmentCard equipment={equipment} key={equipment.id} />
            ))}
          </div>
        </section>
        <Button type="submit">Create Request</Button>
      </div>
    </Form>
  );
}
