import { getBorrows } from "@/actions/borrow.action";
import { BorrowCard } from "./BorrowCard";

export async function BorrowList() {
  const borrows = await getBorrows();
  return (
    <section>
      <h1>Requests</h1>
      <div className="w-full flex flex-col gap-4">
        {borrows.map((borrow) => (
          <BorrowCard key={borrow.id} borrow={borrow} />
        ))}
      </div>
    </section>
  );
}
