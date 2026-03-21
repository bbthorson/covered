import type { Metadata } from "next";
import { ProviderSearch } from "./provider-search";

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

      <ProviderSearch />
    </div>
  );
}
