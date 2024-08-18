import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { DepartmentList } from "./DepartmentList";

export default function DepartmentsPage() {
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
      <Suspense fallback={<>Loading Departments...</>}>
        <DepartmentList />
      </Suspense>
    </section>
  );
}
