export interface Provider {
  id: string;
  name: string;
  nameLine2: string | null;
  address: {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  intakePhone: string | null;
  hotline: string | null;
  website: string | null;
  location: {
    lat: number;
    lng: number;
  };
  distance: number;
  facilityType: string;
  services: ProviderServices;
}

export interface ProviderServices {
  typeOfCare: string[];
  serviceSetting: string[];
  ageGroups: string[];
  paymentAccepted: string[];
  paymentAssistance: string[];
  specialPrograms: string[];
  languageServices: string[];
  emergencyServices: string[];
  facilityOperation: string[];
}

export interface ProviderSearchParams {
  lat: number;
  lng: number;
  radius?: number;
  type?: "sa" | "mh" | "both";
  services?: string;
  stateCode?: string;
  page?: number;
  pageSize?: number;
}

export interface ProviderSearchResult {
  providers: Provider[];
  page: number;
  totalPages: number;
  totalCount: number;
}

// Raw FindTreatment.gov API types
export interface FindTreatmentRow {
  _irow: number;
  name1: string;
  name2: string | null;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
  type_facility: string;
  intake1: string | null;
  hotline1: string | null;
  website: string | null;
  latitude: string;
  longitude: string;
  miles: number;
  services: FindTreatmentService[];
}

export interface FindTreatmentService {
  f1: string;
  f2: string;
  f3: string;
}

export interface FindTreatmentResponse {
  page: number;
  totalPages: number;
  recordCount: number;
  rows: FindTreatmentRow[];
}
