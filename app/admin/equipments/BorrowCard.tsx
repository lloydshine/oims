import { getDepartment } from "@/actions/department.action";
import { StatusBadge } from "@/components/main/StatusBadge";
import { DepartmentIcon } from "@/components/marketing/DepartmentIcon";
import { Button } from "@/components/ui/button";
import { Borrow } from "@prisma/client";
import Link from "next/link";

export async function BorrowCard({ borrow }: { borrow: Borrow }) {
  const department = await getDepartment(borrow.departmentId);
  if (!department) return null;

  return (
    <div className="w-full p-6 drop-shadow-lg bg-slate-50 border-2 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-6">
      {/* Department Icon and Name */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <DepartmentIcon department={department} />
        <div>
          <h2 className="text-lg md:text-xl font-semibold">
            {department.name}
          </h2>
          <p className="text-sm text-gray-500">Borrower: {borrow.borrower}</p>
          <p className="text-sm font-medium">
            <span className="font-semibold">Event:</span> {borrow.event}
          </p>
        </div>
      </div>

      {/* Borrow Details */}
      <div className="text-left md:text-right w-full md:w-auto mt-4 md:mt-0 md:ml-auto space-y-1">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Date Requested:</span>{" "}
          {new Date(borrow.dateRequested).toLocaleDateString()}
        </p>
        {borrow.dateToBeReturned && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Due Date:</span>{" "}
            {new Date(borrow.dateToBeReturned).toLocaleDateString()}
          </p>
        )}
        <StatusBadge status={borrow.status} />
      </div>

      {/* View Button */}
      <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4">
        <Button variant="secondary">
          <Link href={`/request/equipments/${borrow.id}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}
