import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function UserLogList() {
  return (
    <section className="mt-20">
      <h1 className="text-2xl font-semibold mb-10">User Logs</h1>
      <Table>
        <TableCaption>A list of user logs.</TableCaption>
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
      </Table>
    </section>
  );
}
