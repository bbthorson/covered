"use client";

import type { Provider } from "@/types/provider";
import { ProviderCard } from "./provider-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProviderListProps {
  providers: Provider[];
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export function ProviderList({
  providers,
  page,
  totalPages,
  totalCount,
  onPageChange,
}: ProviderListProps) {
  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-warm-500">
          No providers found. Try expanding your search radius or changing filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-warm-500 mb-4">
        Showing {providers.length} of {totalCount} providers
      </p>

      <div className="space-y-4">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          <span className="text-sm text-warm-500">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
