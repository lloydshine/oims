import { getDepartment, updateDepartment } from "@/actions/department.action";
import { createProgram, getDepartmentPrograms } from "@/actions/program.action";
import { DataTable } from "@/components/data-table";
import { programCol } from "../columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DepartmentForm } from "@/components/forms/DepartmentForm";
import { ProgramForm } from "@/components/forms/ProgramForm";

export default async function DepartmentPage({ params }: { params: any }) {
  const department = await getDepartment(params.department);
  if (!department) return <>Wjat</>;
  const programs = await getDepartmentPrograms(department.id);
  if (!department) return <>Wjat</>;
  return (
    <>
      <section className="mb-10">
        <Button asChild className="mb-10" variant="link">
          <Link href="/admin/departments">Back</Link>
        </Button>
        <h1 className="text-3xl font-bold mb-10">{department?.name}</h1>
        <DataTable columns={programCol} data={programs} />
      </section>
      <DepartmentForm
        onSubmit={updateDepartment}
        defaultValues={{
          id: department.id,
          name: department.name,
          shortname: department.shortName,
        }}
      />
      <ProgramForm departmentId={department.id} onSubmit={createProgram} />
    </>
  );
}
