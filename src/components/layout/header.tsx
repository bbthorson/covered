"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Heart } from "lucide-react";

const navLinks = [
  { href: "/screen", label: "Check In" },
  { href: "/providers", label: "Find Care" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-warm-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-700">
          <Heart className="h-6 w-6 fill-primary-500 text-primary-500" aria-hidden="true" />
          Covered
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-primary-50 text-primary-700"
                  : "text-warm-600 hover:text-warm-900 hover:bg-warm-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileNav links={navLinks} pathname={pathname} />
      </div>
    </header>
  );
}
