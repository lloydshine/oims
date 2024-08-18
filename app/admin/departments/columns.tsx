"use client";

import { Button } from "@/components/ui/button";
import { Department, Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const departmentCol: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Department Name",
  },
  {
    accessorKey: "shortName",
    header: "Shortname",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const department = row.getValue("shortName");
      return (
        <Button asChild variant="link">
          <Link href={`/admin/departments/${department}`}>View</Link>
        </Button>
      );
    },
  },
];

export const programCol: ColumnDef<Program>[] = [
  {
    accessorKey: "name",
    header: "Program Name",
  },
  {
    accessorKey: "shortName",
    header: "Shortname",
  },
];
