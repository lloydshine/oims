import { getUsers } from "@/actions/user.action";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

export async function UserList() {
  const users = await getUsers();
  return <DataTable columns={columns} data={users} />;
}
