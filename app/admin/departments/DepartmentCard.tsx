import { Department } from "@prisma/client";
import { DepartmentIcon } from "@/components/marketing/DepartmentIcon";
import { Button } from "@/components/ui/button";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <div className="flex justify-between items-center relative md:w-[500px] w-full p-5 drop-shadow-lg bg-slate-200 border-2 rounded-md overflow-hidden">
      <div className="relative flex items-center gap-4">
        <DepartmentIcon department={department} />
        <h1 className="font-semibold text-lg text-center">{department.name}</h1>
      </div>
      <Button variant="secondary">View</Button>
    </div>
  );
}
