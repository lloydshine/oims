import { getDepartments } from "@/actions/department.action";

export async function DepartmentList() {
  const departments = await getDepartments();
  return (
    <>
      <pre>{JSON.stringify(departments, null, 2)}</pre>
    </>
  );
}
