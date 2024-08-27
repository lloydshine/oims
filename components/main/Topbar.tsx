import { User } from "lucia";
import { UserButton } from "./UserButton";
import { SideNav } from "./Sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { FileIcon, MessageCircleQuestion } from "lucide-react";

export function Topbar({ user }: { user: User }) {
  return (
    <nav className="z-50 bg-white fixed w-full top-0 left-0 p-5 border-b-2 flex items-center justify-between">
      <div>
        <h1>OIMS</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="md:flex items-center gap-1 hidden">
          <Button variant="link" className="space-x-1">
            <MessageCircleQuestion />
            <p>Support</p>
          </Button>
          <Button variant="link" className="space-x-1">
            <FileIcon />
            <p>Documentation</p>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <UserButton user={user} />
          <SideNav user={user} />
        </div>
      </div>
    </nav>
  );
}
