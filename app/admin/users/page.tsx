import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserList } from "./UserList";
import { Suspense } from "react";
import { UserLogList } from "./UserLogList";

export default function UsersPage() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
      </header>
      <br />
      <Button asChild>
        <Link href="/admin/users/add">Add User</Link>
      </Button>
      <br />
      <br />
      <Suspense fallback={<>Loading Users...</>}>
        <UserList />
      </Suspense>
      <Suspense fallback={<>Loading Logs...</>}>
        <UserLogList />
      </Suspense>
    </section>
  );
}
