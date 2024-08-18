import { updateUser } from "@/actions/auth.action";
import { getUser, getUsers } from "@/actions/user.action";
import { UserForm } from "@/components/forms/UserForm";
import { validateRequest } from "@/lib/auth";

export default async function SettingsPage() {
  const { user } = await validateRequest();
  if (!user) return null;

  const userData = await getUser(user.id);
  if (!userData) return null;
  return (
    <main>
      <section>
        <h1>Account Settings</h1>
        <UserForm
          defaultValues={{
            id: userData.id,
            username: userData.username,
            assignedOffice: userData.assignedOffice,
            role: userData.role,
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
            email: userData.email,
            contactNumber: userData.contactNumber,
          }}
          onSubmit={updateUser}
        />
      </section>
    </main>
  );
}
