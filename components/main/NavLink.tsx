"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ links }: { links: any[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, i) => {
        const isActive = pathname.includes(link.href);
        return (
          <Link
            href={link.href}
            className={`p-4 transition-all flex gap-4 cursor-pointer ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:text-primary text-foreground/60"
            }`}
            key={i}
          >
            {link.icon}
            {link.tag}
          </Link>
        );
      })}
    </>
  );
}
