import { UserButton } from "@/components/main/UserButton";
import { User } from "lucia";
import { StatusButton } from "./StatusButton";
import { Borrow, Status } from "@prisma/client";
import { updateBorrowStatus } from "@/actions/borrow.action";
import { BorrowedEquipment } from "./BorrowedEquipmentCard";

export function BorrowAdminPanel({
  user,
  request,
  borrows,
}: {
  user: User;
  request: Borrow;
  borrows: BorrowedEquipment[];
}) {
  return (
    <main className="p-10 h-[500px] bg-primary space-y-5">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <UserButton user={user} />
          <p className="text-white">Logged in as: {user.username}</p>
        </div>
      </section>
      <section className="flex items-center gap-4">
        <StatusButton
          status={Status.Approved}
          id={request.id}
          updateAction={updateBorrowStatus}
        />
        <StatusButton
          status={Status.Declined}
          id={request.id}
          updateAction={updateBorrowStatus}
        />
        <StatusButton
          status={Status.Completed}
          id={request.id}
          updateAction={updateBorrowStatus}
        />
        <StatusButton
          status={Status.Pending}
          id={request.id}
          updateAction={updateBorrowStatus}
        />
      </section>
    </main>
  );
}
