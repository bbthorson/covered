import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Providers",
  description:
    "Search for substance use and mental health treatment facilities near you, powered by SAMHSA's FindTreatment.gov data.",
};

export default function ProvidersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-warm-900">
          Find Treatment Providers
        </h1>
        <p className="mt-4 text-lg text-warm-500">
          Search for substance use and mental health treatment facilities near
          you. Data comes directly from SAMHSA&apos;s FindTreatment.gov.
        </p>
      </div>

      {/* Cross-link to screening */}
      <div className="max-w-3xl mx-auto mb-8 p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3">
        <ClipboardCheck className="h-5 w-5 text-primary-600 shrink-0" aria-hidden="true" />
        <p className="text-sm text-primary-800">
          Not sure what level of care you need?{" "}
          <Link href="/screen" className="font-medium underline hover:no-underline">
            Take a quick screening
          </Link>{" "}
          first.
        </p>
      </div>

      {/* Search placeholder */}
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter your address or zip code"
              disabled
            />
          </div>
          <Button disabled>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Search
          </Button>
        </div>
        <p className="mt-4 text-sm text-warm-400 text-center">
          Provider search will be fully functional in Phase 3.
        </p>
      </div>
    </div>
  );
}
