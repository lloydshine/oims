import { getUsers } from "@/actions/user.action";

export async function UserList() {
  const users = await getUsers();
  return (
    <>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}
