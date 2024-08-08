import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { BookmarkIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { marketingLinks } from "@/lib/globals";

export function SideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className="flex items-center gap-4">
            <BookmarkIcon />
            <h1>IOMS</h1>
          </div>
          <SheetDescription>Strive to Excelence</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-10">
          {marketingLinks.map((link, i) => (
            <SheetTrigger asChild key={i}>
              <Link
                href={`#${link.tag}`}
                className="text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                {link.tag}
              </Link>
            </SheetTrigger>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline">Contact</Button>
          <Button variant="outline">Chatbot</Button>
          <Button variant="outline">Email</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
