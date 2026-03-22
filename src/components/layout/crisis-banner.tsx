import { Phone } from "lucide-react";

export function CrisisBanner() {
  return (
    <div className="bg-crisis-700 text-white px-4 py-2 text-center text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="font-medium">Need to talk to someone?</span>
        <span className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            Call{" "}
            <a href="tel:988" className="underline font-semibold hover:no-underline">
              988
            </a>{" "}
            (Suicide &amp; Crisis Lifeline)
          </span>
        </span>
        <span className="hidden sm:inline" aria-hidden="true">|</span>
        <span className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            SAMHSA Helpline:{" "}
            <a
              href="tel:1-800-662-4357"
              className="underline font-semibold hover:no-underline"
            >
              1-800-662-4357
            </a>
          </span>
        </span>
      </div>
    </div>
  );
}
