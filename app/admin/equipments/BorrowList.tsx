import { getBorrows } from "@/actions/borrow.action";

export async function BorrowList() {
  const borrows = await getBorrows();
  return (
    <>
      <pre>{JSON.stringify(borrows, null, 2)}</pre>
    </>
  );
}
