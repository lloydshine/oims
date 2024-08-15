import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { SideBar } from "./Sidebar";
import { marketingLinks } from "@/lib/globals";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full py-4 px-6 flex items-center justify-between gap-4 bg-background/30 backdrop-blur-lg border-b-2">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <BookmarkIcon />
          <h1>IOMS</h1>
        </div>
        <div className="gap-4 hidden md:flex">
          {marketingLinks.map((link, i) => (
            <Link
              key={i}
              href={`#${link.tag}`}
              className="text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              {link.tag}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <SideBar />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button asChild>
          <Link href="/admin/dashboard">Admin</Link>
        </Button>
      </div>
    </nav>
  );
}
