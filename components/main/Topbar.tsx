import { User } from "lucia";
import { UserButton } from "./UserButton";
import { SideNav } from "./Sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { FileIcon, MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";

export function Topbar({ user }: { user: User }) {
  return (
    <nav className="z-50 bg-white fixed w-full top-0 left-0 px-5 py-5 border-b-2 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-8 flex-1">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" height={40} width={40} alt="Logo" />
          <h1 className="font-black text-primary hidden md:block">OIMS</h1>
        </div>
        <Input
          className="h-9 w-[300px] rounded-full flex-1 md:flex-none"
          type="text"
          placeholder="Search"
        />
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
