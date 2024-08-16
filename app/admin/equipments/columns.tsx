"use client";

import { Badge } from "@/components/ui/badge";
import { Equipment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ row }) => {
      const isAvailable = row.getValue("isAvailable");
      return (
        <div>
          <Badge className={`${isAvailable ? "bg-green-600" : "bg-slate-700"}`}>
            {isAvailable ? "Available" : "Not Available"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as string;
      return <p>Php{price}.00</p>;
    },
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
  },
];
