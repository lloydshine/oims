import { getDepartment } from "@/actions/department.action";
import { getDepartmentPrograms, getPrograms } from "@/actions/program.action";
import { DataTable } from "@/components/data-table";
import { programCol } from "../columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DepartmentPage({ params }: { params: any }) {
  const department = await getDepartment(
    String(params.department).toUpperCase()
  );
  if (!department) return null;
  const programs = await getDepartmentPrograms(department.id);
  if (!department) return null;
  return (
    <section>
      <Button asChild className="mb-10" variant="link">
        <Link href="/admin/departments">Back</Link>
      </Button>
      <h1 className="text-3xl font-bold mb-20">{department?.name}</h1>
      <DataTable columns={programCol} data={programs} />
    </section>
  );
}
