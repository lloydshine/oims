import { Form } from "@/lib/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { createEquipment } from "@/actions/equipment.action";

export function AddEquipmentForm() {
  return (
    <Form action={createEquipment}>
      <Button asChild className="mb-10" variant="link">
        <Link href="/admin/equipments">Back</Link>
      </Button>
      <div className="flex flex-col gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Equipment Name"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="isAvailable">isAvailable</Label>
          <Select name="isAvailable">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Not Available</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
          />
        </div>
        <Button type="submit">Create</Button>
      </div>
    </Form>
  );
}
