import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/theme-provider";
import { departmentCol } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDepartments } from "@/actions/department.action";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Departments</h1>
      </header>
      <br />
      <Button asChild>
        <Link href="/admin/departments/add">Add Department</Link>
      </Button>
      <br />
      <br />
      <DataTable columns={departmentCol} data={departments} />
    </section>
  );
}
