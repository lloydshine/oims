import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/theme-provider";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDepartments } from "@/actions/department.action";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <ModeToggle />
      </header>
      <br />
      <Button asChild>
        <Link href="/departments/add">Add Department</Link>
      </Button>
      <br />
      <br />
      <DataTable columns={columns} data={departments} />
    </section>
  );
}
