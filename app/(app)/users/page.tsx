import { getUsers } from "@/actions/user.action";
import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/theme-provider";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <br />
      <DataTable columns={columns} data={users} />

      <section className="mt-20">
        <h1 className="text-2xl font-semibold mb-10">User Logs</h1>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User</TableHead>
              <TableHead>Log</TableHead>
              <TableHead>Date Performed</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Kent</TableCell>
              <TableCell>Added New Item</TableCell>
              <TableCell>Yesterday 10:23 PM</TableCell>
              <TableCell className="text-right">Report</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </section>
  );
}
