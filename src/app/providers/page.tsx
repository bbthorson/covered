import type { Metadata } from "next";
import { ProviderSearch } from "./provider-search";

export const metadata: Metadata = {
  title: "Find Care",
  description:
    "Find substance use and mental health care near you. Search thousands of providers and programs powered by SAMHSA data.",
};

export default function ProvidersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-warm-900">
          Find Care Near You
        </h1>
        <p className="mt-4 text-lg text-warm-500">
          Search for providers and programs in your area — from counseling to
          residential care. Powered by SAMHSA&apos;s FindTreatment.gov.
        </p>
      </div>

      <ProviderSearch />
    </div>
  );
}
