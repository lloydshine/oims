import { register } from "@/actions/auth.action";
import { UserForm } from "@/components/forms/UserForm";

export default function AddUserPage() {
  return (
    <section>
      <UserForm onSubmit={register} />
    </section>
  );
}
