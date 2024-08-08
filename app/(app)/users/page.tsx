import { getUsers } from "@/actions/user.action";
import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/theme-provider";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <ModeToggle />
      </header>
      <br />
      <Button asChild>
        <Link href="/users/add">Add User</Link>
      </Button>
      <br />
      <DataTable columns={columns} data={users} />
    </section>
  );
}
