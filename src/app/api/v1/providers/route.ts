import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { searchProviders } from "@/lib/api/findtreatment";
import { geocodeAddress } from "@/lib/geo";

const searchSchema = z.object({
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  address: z.string().optional(),
  radius: z.coerce.number().min(1).max(100).default(25),
  type: z.enum(["sa", "mh", "both"]).optional(),
  services: z.string().optional(),
  stateCode: z.string().length(2).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const raw: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    raw[key] = value;
  });

  const parsed = searchSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid search parameters",
          details: parsed.error.issues,
        },
      },
      { status: 400 }
    );
  }

  let { lat, lng } = parsed.data;
  const { address, radius, type, services, stateCode, page, pageSize } =
    parsed.data;

  // If no lat/lng, geocode the address
  if (lat === undefined || lng === undefined) {
    if (!address) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Provide either lat/lng or address",
          },
        },
        { status: 400 }
      );
    }

    try {
      const geo = await geocodeAddress(address);
      if (!geo) {
        return NextResponse.json(
          {
            error: {
              code: "GEOCODING_FAILED",
              message: `Could not find coordinates for "${address}". Try a more specific address or zip code.`,
            },
          },
          { status: 400 }
        );
      }
      lat = geo.lat;
      lng = geo.lng;
    } catch {
      return NextResponse.json(
        {
          error: {
            code: "GEOCODING_ERROR",
            message: "Geocoding service is temporarily unavailable",
          },
        },
        { status: 502 }
      );
    }
  }

  try {
    const result = await searchProviders({
      lat,
      lng,
      radius,
      type,
      services,
      stateCode,
      page,
      pageSize,
    });

    return NextResponse.json(
      {
        data: result.providers,
        meta: {
          page: result.page,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          coordinates: { lat, lng },
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Provider search failed";
    return NextResponse.json(
      { error: { code: "UPSTREAM_ERROR", message } },
      { status: 502 }
    );
  }
}
