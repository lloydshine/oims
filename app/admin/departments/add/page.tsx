import { createDepartment } from "@/actions/department.action";
import { DepartmentForm } from "@/components/forms/DepartmentForm";

export default function AddUserPage() {
  return (
    <section>
      <DepartmentForm onSubmit={createDepartment} />
    </section>
  );
}
