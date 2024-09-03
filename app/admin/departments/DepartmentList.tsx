import { getDepartments } from "@/actions/department.action";
import { DepartmentCard } from "./DepartmentCard";

export async function DepartmentList() {
  const departments = await getDepartments();
  return (
    <section>
      <div className="w-full flex flex-wrap gap-4">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </section>
  );
}
