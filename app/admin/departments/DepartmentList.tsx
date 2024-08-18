import { getDepartments } from "@/actions/department.action";
import { DataTable } from "@/components/data-table";
import { departmentCol } from "./columns";

export async function DepartmentList() {
  const departments = await getDepartments();
  return <DataTable columns={departmentCol} data={departments} />;
}
