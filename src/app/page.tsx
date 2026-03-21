import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ClipboardCheck, MapPin, BookOpen, ArrowRight } from "lucide-react";

const pillars = [
  {
    href: "/screen",
    icon: ClipboardCheck,
    title: "Evaluate Your Risk",
    description:
      "Take a free, confidential screening to better understand your relationship with alcohol or substances.",
    cta: "Start Screening",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    href: "/providers",
    icon: MapPin,
    title: "Find Providers",
    description:
      "Search for substance use and mental health treatment facilities near you, powered by SAMHSA data.",
    cta: "Search Providers",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    href: "/learn",
    icon: BookOpen,
    title: "Learn",
    description:
      "Educational resources about substance use disorders, treatment options, recovery, and supporting loved ones.",
    cta: "Explore Resources",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-warm-900">
              You&apos;re not alone.{" "}
              <span className="text-primary-600">Help is here.</span>
            </h1>
            <p className="mt-6 text-lg text-warm-600 leading-relaxed">
              Covered is a free, open-source tool that helps you understand your
              risk, find treatment providers near you, and learn about substance
              use care — all in one place, with no sign-up required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/screen">
                <Button size="lg">
                  Take a Free Screening
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/providers">
                <Button variant="outline" size="lg">
                  Find Providers Near You
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-900">
            How Covered Can Help
          </h2>
          <p className="mt-3 text-warm-500 max-w-2xl mx-auto">
            Whether you&apos;re concerned about yourself or a loved one, these
            tools can help you take the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.href} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg ${pillar.bgColor} flex items-center justify-center mb-2`}
                >
                  <pillar.icon className={`h-6 w-6 ${pillar.color}`} aria-hidden="true" />
                </div>
                <CardTitle>{pillar.title}</CardTitle>
                <CardDescription>{pillar.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter>
                <Link href={pillar.href} className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    {pillar.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust / Data Source */}
      <section className="bg-warm-50 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-warm-900">
              Powered by Trusted Data
            </h2>
            <p className="mt-3 text-sm text-warm-500">
              Provider data comes directly from SAMHSA&apos;s FindTreatment.gov,
              the official U.S. government resource for finding substance use
              and mental health treatment facilities. Screening tools use
              validated, peer-reviewed instruments recommended by the World
              Health Organization and the National Institute on Alcohol Abuse and
              Alcoholism.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
