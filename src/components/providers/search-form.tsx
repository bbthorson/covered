"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search, LocateFixed, Loader2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (params: {
    address?: string;
    lat?: number;
    lng?: number;
    radius: number;
    type: string;
  }) => void;
  isLoading: boolean;
}

const radiusOptions = [
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "25", label: "25 miles" },
  { value: "50", label: "50 miles" },
  { value: "100", label: "100 miles" },
];

const typeOptions = [
  { value: "", label: "All facilities" },
  { value: "sa", label: "Substance use" },
  { value: "mh", label: "Mental health" },
  { value: "both", label: "Both" },
];

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState("25");
  const [type, setType] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!address.trim()) return;
      onSearch({ address: address.trim(), radius: Number(radius), type });
    },
    [address, radius, type, onSearch]
  );

  const handleGeolocation = useCallback(() => {
    if (!navigator.geolocation) return;

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoading(false);
        setAddress("Current location");
        onSearch({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          radius: Number(radius),
          type,
        });
      },
      () => {
        setGeoLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, [radius, type, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Enter address, city, or zip code"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            aria-label="Search location"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleGeolocation}
          disabled={geoLoading}
          title="Use my current location"
        >
          {geoLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <LocateFixed className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">My Location</span>
        </Button>
        <Button type="submit" disabled={isLoading || (!address.trim())}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
          Search
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="w-40">
          <Select
            label="Distance"
            options={radiusOptions}
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
        </div>
        <div className="w-48">
          <Select
            label="Facility type"
            options={typeOptions}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
