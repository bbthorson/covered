"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  links: { href: string; label: string }[];
  pathname: string;
}

export function MobileNav({ links, pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-warm-600 hover:text-warm-900"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-warm-200 shadow-lg">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-warm-600 hover:text-warm-900 hover:bg-warm-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
