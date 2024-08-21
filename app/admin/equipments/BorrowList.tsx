import { getBorrows } from "@/actions/borrow.action";
import { DataTable } from "@/components/data-table";
import { borrowColumns } from "./columns";

export async function BorrowList() {
  const borrows = await getBorrows();
  return (
    <>
      <h1>Requests</h1>
      <DataTable columns={borrowColumns} data={borrows} />
    </>
  );
}
