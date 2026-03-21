import type { Provider } from "@/types/provider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Globe, Navigation } from "lucide-react";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const { address } = provider;
  const fullAddress = [
    address.street1,
    address.street2,
    `${address.city}, ${address.state} ${address.zip}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-warm-900 truncate">
              {provider.name}
            </h3>
            {provider.nameLine2 && (
              <p className="text-sm text-warm-500 truncate">
                {provider.nameLine2}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-warm-400 shrink-0">
            <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
            {provider.distance.toFixed(1)} mi
          </div>
        </div>

        {/* Address */}
        <div className="mt-3 flex items-start gap-2 text-sm text-warm-600">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-warm-400" aria-hidden="true" />
          <span>{fullAddress}</span>
        </div>

        {/* Phone */}
        <div className="mt-2 flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 shrink-0 text-warm-400" aria-hidden="true" />
          <a
            href={`tel:${provider.phone}`}
            className="text-primary-600 hover:underline"
          >
            {provider.phone}
          </a>
          {provider.intakePhone && provider.intakePhone !== provider.phone && (
            <span className="text-warm-400">
              (Intake:{" "}
              <a
                href={`tel:${provider.intakePhone}`}
                className="text-primary-600 hover:underline"
              >
                {provider.intakePhone}
              </a>
              )
            </span>
          )}
        </div>

        {/* Website */}
        {provider.website && (
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 shrink-0 text-warm-400" aria-hidden="true" />
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline truncate"
            >
              {provider.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {/* Service badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {provider.services.typeOfCare.map((svc) => (
            <Badge key={svc} variant="primary">
              {svc}
            </Badge>
          ))}
          {provider.services.serviceSetting.slice(0, 3).map((svc) => (
            <Badge key={svc} variant="outline">
              {svc}
            </Badge>
          ))}
        </div>

        {/* Payment */}
        {provider.services.paymentAccepted.length > 0 && (
          <p className="mt-2 text-xs text-warm-400">
            Payment: {provider.services.paymentAccepted.join(", ")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
