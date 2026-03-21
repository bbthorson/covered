import type {
  FindTreatmentResponse,
  FindTreatmentRow,
  Provider,
  ProviderServices,
  ProviderSearchParams,
  ProviderSearchResult,
} from "@/types/provider";

const BASE_URL = "https://findtreatment.gov/locator/exportsAsJson/v2";

const MILES_TO_METERS = 1609.34;

/**
 * Search for providers via the FindTreatment.gov API.
 */
export async function searchProviders(
  params: ProviderSearchParams
): Promise<ProviderSearchResult> {
  const radiusMiles = params.radius ?? 25;
  const radiusMeters = Math.round(radiusMiles * MILES_TO_METERS);

  const query = new URLSearchParams();
  query.set("sAddr", `${params.lat},${params.lng}`);
  query.set("limitType", "2"); // distance-based search
  query.set("limitValue", String(radiusMeters));
  query.set("page", String(params.page ?? 1));
  query.set("pageSize", String(Math.min(params.pageSize ?? 25, 100)));
  query.set("sort", "0"); // nearest first

  if (params.type) {
    query.set("sType", params.type);
  }
  if (params.services) {
    query.set("sCodes", params.services);
  }
  if (params.stateCode) {
    query.set("stateCode", params.stateCode);
  }

  const url = `${BASE_URL}?${query.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(
      `FindTreatment.gov API error: ${response.status} ${response.statusText}`
    );
  }

  const data: FindTreatmentResponse = await response.json();

  return {
    providers: data.rows.map(transformRow),
    page: data.page,
    totalPages: data.totalPages,
    totalCount: data.recordCount,
  };
}

/**
 * Transform a raw FindTreatment.gov row into our Provider type.
 */
function transformRow(row: FindTreatmentRow): Provider {
  // Create a stable ID from the facility data
  const id = btoa(`${row.name1}|${row.street1}|${row.city}|${row.state}|${row.zip}`)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 32);

  return {
    id,
    name: row.name1,
    nameLine2: row.name2 || null,
    address: {
      street1: row.street1,
      street2: row.street2 || null,
      city: row.city,
      state: row.state,
      zip: row.zip,
    },
    phone: row.phone,
    intakePhone: row.intake1 || null,
    hotline: row.hotline1 || null,
    website: row.website ? normalizeUrl(row.website) : null,
    location: {
      lat: parseFloat(row.latitude),
      lng: parseFloat(row.longitude),
    },
    distance: row.miles,
    facilityType: row.type_facility,
    services: extractServices(row.services),
  };
}

/**
 * Map the f2 service codes to named fields, splitting semicolon-delimited values.
 */
function extractServices(
  services: FindTreatmentRow["services"]
): ProviderServices {
  const result: ProviderServices = {
    typeOfCare: [],
    serviceSetting: [],
    ageGroups: [],
    paymentAccepted: [],
    paymentAssistance: [],
    specialPrograms: [],
    languageServices: [],
    emergencyServices: [],
    facilityOperation: [],
  };

  const codeMap: Record<string, keyof ProviderServices> = {
    TC: "typeOfCare",
    SET: "serviceSetting",
    AGE: "ageGroups",
    PAY: "paymentAccepted",
    PYAS: "paymentAssistance",
    SG: "specialPrograms",
    SL: "languageServices",
    EMS: "emergencyServices",
    FOP: "facilityOperation",
  };

  for (const svc of services) {
    const field = codeMap[svc.f2];
    if (field) {
      result[field] = svc.f3
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return result;
}

/**
 * Ensure URLs have a protocol prefix.
 */
function normalizeUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}
