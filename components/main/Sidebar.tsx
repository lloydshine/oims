import { adminLinks, appLinks } from "@/lib/globals";
import { Separator } from "../ui/separator";
import { NavLink } from "./NavLink";
import { ScrollArea } from "../ui/scroll-area";
import { User } from "lucia";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronLeftCircle, MenuIcon } from "lucide-react";

export function Sidebar({ user }: { user: User }) {
  return (
    <ScrollArea className="md:flex flex-col w-[300px] border-r-2 max-h-screen pt-24 hidden">
      <div className="p-2 border-2 mx-2 mb-2 rounded-md text-center bg-secondary text-secondary-foreground">
        <h1 className="font-bold">{user.assignedOffice}</h1>
      </div>
      <div className="flex flex-col">
        <NavLink links={appLinks} />
      </div>
      <Separator className="my-10" />
      {user.role === "ADMIN" ? <NavLink links={adminLinks} /> : null}
    </ScrollArea>
  );
}

export function SideNav({ user }: { user: User }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-0">
        <SheetHeader className="flex-row p-5 items-center justify-between">
          <SheetTitle>OIMS</SheetTitle>
          <SheetClose asChild>
            <Button size="icon" variant="outline">
              <ChevronLeftCircle />
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex flex-col w-full max-h-screen">
          <div className="flex flex-col">
            <NavLink links={appLinks} />
          </div>
          <Separator className="my-10" />
          {user.role === "ADMIN" ? <NavLink links={adminLinks} /> : null}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
