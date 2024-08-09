"use client";

import { Department } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Department Name",
  },
  {
    accessorKey: "shortName",
    header: "Shortname",
  },
];
