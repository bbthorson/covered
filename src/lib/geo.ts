/**
 * Geocode a US address to lat/lng using the US Census Geocoder API.
 * Free, no API key required, US addresses only.
 */

const CENSUS_GEOCODER_URL =
  "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";

interface GeocodingResult {
  lat: number;
  lng: number;
  matchedAddress: string;
}

export async function geocodeAddress(
  address: string
): Promise<GeocodingResult | null> {
  const params = new URLSearchParams({
    address,
    benchmark: "Public_AR_Current",
    format: "json",
  });

  const response = await fetch(`${CENSUS_GEOCODER_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status}`);
  }

  const data = await response.json();

  const matches = data?.result?.addressMatches;
  if (!matches || matches.length === 0) {
    return null;
  }

  const match = matches[0];
  return {
    lat: match.coordinates.y,
    lng: match.coordinates.x,
    matchedAddress: match.matchedAddress,
  };
}
