import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ClipboardCheck, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-warm-900">
        Page not found
      </h2>
      <p className="mt-3 text-warm-500">
        This page doesn&apos;t exist — but we&apos;re still here for you.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Button>
        </Link>
        <Link href="/screen">
          <Button variant="outline">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Check In
          </Button>
        </Link>
        <Link href="/providers">
          <Button variant="outline">
            <Search className="h-4 w-4" aria-hidden="true" />
            Find Care
          </Button>
        </Link>
        <Link href="/learn">
          <Button variant="outline">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Learn
          </Button>
        </Link>
      </div>

      <p className="mt-12 text-sm text-warm-400">
        Need to talk to someone? Call{" "}
        <a href="tel:988" className="text-primary-600 font-medium hover:underline">
          988
        </a>{" "}
        or{" "}
        <a href="tel:1-800-662-4357" className="text-primary-600 font-medium hover:underline">
          1-800-662-4357
        </a>
      </p>
    </div>
  );
}
