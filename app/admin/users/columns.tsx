"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "assignedOffice",
    header: "Assigned Office",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      if (!role) return null;
      return (
        <div>
          <Badge
            className={`${role == "ADMIN" ? "bg-blue-500" : "bg-green-600"}`}
          >
            {role == "ADMIN" ? "Admin" : "Assistant"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "firstName",
    header: "Firstname",
  },
  {
    accessorKey: "lastName",
    header: "Lastname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "PhoneNumber",
  },
];
