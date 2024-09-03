import { getBorrow } from "@/actions/borrow.action";
import { getDepartment } from "@/actions/department.action";
import { getBorrowedEquipments } from "@/actions/equipment.action";
import { StatusBadge } from "@/components/main/StatusBadge";
import { DepartmentIcon } from "@/components/marketing/DepartmentIcon";
import BorrowedEquipmentCard from "./BorrowedEquipmentCard";
import { Status } from "@prisma/client";
import { validateRequest } from "@/lib/auth";
import { BorrowAdminPanel } from "./BorrowAdminPanel";

export default async function RequestPage({ params }: { params: any }) {
  const request = await getBorrow(params.id);
  if (!request) return <p>Request not found.</p>;
  const borrows = await getBorrowedEquipments(request.id);
  const department = await getDepartment(request.departmentId);
  if (!department) return;

  const { user } = await validateRequest();

  return (
    <>
      <main className="h-screen flex flex-col justify-center p-5 md:p-10 bg-slate-200">
        <section className="flex h-[80%] gap-10 items-center flex-col md:flex-row">
          <div className="md:flex-1 w-full space-y-10">
            <div className="bg-white drop-shadow-lg border-2 rounded-lg p-10 space-y-8">
              <h1 className="text-2xl font-semibold">Request Details</h1>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-foreground/60 hidden md:block">
                    Department
                  </p>
                  <div className="flex items-center gap-4 flex-col text-center md:flex-row">
                    <DepartmentIcon department={department} />
                    <h1 className="font-semibold">{department.name}</h1>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60">Event</p>
                  <p>{request.event}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60">Borrower</p>
                  <p>{request.borrower}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60">Date Requested</p>
                  <p>{new Date(request.dateRequested).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60">Request Status</p>
                  <StatusBadge status={request.status} />
                </div>
              </div>
            </div>
            {(request.status === Status.Approved ||
              request.status === Status.Completed) && (
              <div className="bg-white drop-shadow-lg border-2 rounded-lg p-10 flex gap-4 flex-wrap justify-around">
                <div className="space-y-2">
                  <p className="text-foreground/60">Date To be Returned</p>
                  {request.dateToBeReturned ? (
                    <p>
                      {new Date(request.dateToBeReturned).toLocaleDateString()}
                    </p>
                  ) : (
                    <p>No Date Yet</p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60">Date Claimed</p>
                  {request.dateClaimed ? (
                    <p>{new Date(request.dateClaimed).toLocaleDateString()}</p>
                  ) : (
                    <p>Not claimed</p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60">Date Returned</p>
                  {request.dateReturned ? (
                    <p>{new Date(request.dateReturned).toLocaleDateString()}</p>
                  ) : (
                    <p>Not returned yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="bg-white drop-shadow-lg h-full border-2 rounded-lg p-10 space-y-8 md:flex-1 w-full">
            <h1 className="text-2xl font-semibold">Equipment Details</h1>
            <section className="flex flex-wrap gap-4">
              {borrows.map((borrow) => (
                <BorrowedEquipmentCard borrow={borrow} key={borrow.id} />
              ))}
            </section>
          </div>
        </section>
      </main>
      {user && (
        <BorrowAdminPanel user={user} request={request} borrows={borrows} />
      )}
    </>
  );
}
