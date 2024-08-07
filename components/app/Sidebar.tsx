import { links } from "@/lib/globals";
import { BookmarkIcon, PieChartIcon } from "lucide-react";
import { UserButton } from "./UserButton";
import { Separator } from "../ui/separator";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex flex-col w-[300px]">
      <div className="flex items-center gap-4 py-10 px-5">
        <BookmarkIcon />
        <h1 className="text-2xl font-bold">IOMS</h1>
      </div>
      <div className="flex flex-col">
        <div className="p-4 hover:bg-primary hover:text-primary-foreground transition-all flex gap-4 cursor-pointer">
          <PieChartIcon />
          <Link href="/dashboard">Dashboard</Link>
        </div>
        {links.map((link, i) => (
          <div
            className="p-4 hover:bg-primary hover:text-primary-foreground transition-all flex gap-4 cursor-pointer"
            key={i}
          >
            {link.icon}
            <Link href={link.href}>{link.tag}</Link>
          </div>
        ))}
      </div>
      <Separator className="my-20" />
      <div className="p-10">
        <UserButton />
      </div>
    </div>
  );
}
