import { adminLinks, appLinks } from "@/lib/globals";
import { BookmarkIcon } from "lucide-react";
import { UserButton } from "./UserButton";
import { Separator } from "../ui/separator";
import { validateRequest } from "@/lib/auth";
import { NavLink } from "./NavLink";

export async function Sidebar() {
  const { user } = await validateRequest();
  return (
    <div className="flex flex-col w-[300px] border-r-2 max-h-screen overflow-y-scroll">
      <div className="flex items-center gap-4 py-10 px-5">
        <BookmarkIcon />
        <h1 className="text-2xl font-bold">IOMS</h1>
      </div>
      <div className="flex flex-col">
        <NavLink links={appLinks} />
      </div>
      <Separator className="my-10" />
      {user?.role === "ADMIN" ? <NavLink links={adminLinks} /> : null}
      <div className="p-10">
        <UserButton />
      </div>
    </div>
  );
}
