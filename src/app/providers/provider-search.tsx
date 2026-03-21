"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { SearchForm } from "@/components/providers/search-form";
import { ProviderList } from "@/components/providers/provider-list";
import type { Provider } from "@/types/provider";
import { ClipboardCheck, AlertCircle } from "lucide-react";

interface SearchState {
  providers: Provider[];
  page: number;
  totalPages: number;
  totalCount: number;
  coordinates?: { lat: number; lng: number };
}

export function ProviderSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchState | null>(null);
  const [lastParams, setLastParams] = useState<Record<string, string>>({});

  const fetchProviders = useCallback(
    async (params: Record<string, string>) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParams = new URLSearchParams(params);
        const response = await fetch(`/api/v1/providers?${searchParams}`);
        const json = await response.json();

        if (!response.ok) {
          setError(json.error?.message || "Search failed. Please try again.");
          setResults(null);
          return;
        }

        setResults({
          providers: json.data,
          page: json.meta.page,
          totalPages: json.meta.totalPages,
          totalCount: json.meta.totalCount,
          coordinates: json.meta.coordinates,
        });
      } catch {
        setError("Network error. Please check your connection and try again.");
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    (params: {
      address?: string;
      lat?: number;
      lng?: number;
      radius: number;
      type: string;
    }) => {
      const queryParams: Record<string, string> = {
        radius: String(params.radius),
        page: "1",
        pageSize: "25",
      };

      if (params.lat !== undefined && params.lng !== undefined) {
        queryParams.lat = String(params.lat);
        queryParams.lng = String(params.lng);
      } else if (params.address) {
        queryParams.address = params.address;
      }

      if (params.type) {
        queryParams.type = params.type;
      }

      setLastParams(queryParams);
      fetchProviders(queryParams);
    },
    [fetchProviders]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = { ...lastParams, page: String(page) };
      setLastParams(params);
      fetchProviders(params);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [lastParams, fetchProviders]
  );

  return (
    <>
      {/* Cross-link to screening */}
      <div className="max-w-3xl mx-auto mb-8 p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3">
        <ClipboardCheck
          className="h-5 w-5 text-primary-600 shrink-0"
          aria-hidden="true"
        />
        <p className="text-sm text-primary-800">
          Not sure what level of care you need?{" "}
          <Link
            href="/screen"
            className="font-medium underline hover:no-underline"
          >
            Take a quick screening
          </Link>{" "}
          first.
        </p>
      </div>

      {/* Search form */}
      <div className="max-w-3xl mx-auto mb-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle
            className="h-5 w-5 text-red-600 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="max-w-3xl mx-auto">
          <ProviderList
            providers={results.providers}
            page={results.page}
            totalPages={results.totalPages}
            totalCount={results.totalCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Empty state before search */}
      {!results && !error && !isLoading && (
        <div className="max-w-3xl mx-auto text-center py-12">
          <p className="text-warm-400 text-sm">
            Enter an address or use your location to find nearby treatment
            facilities.
          </p>
          <p className="text-warm-400 text-xs mt-2">
            Data provided by SAMHSA&apos;s{" "}
            <a
              href="https://findtreatment.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              FindTreatment.gov
            </a>
          </p>
        </div>
      )}
    </>
  );
}
