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
    title: "Check In With Yourself",
    description:
      "Quick, private screenings to help you understand where you stand with alcohol or substances. No judgment, just clarity.",
    cta: "Take a Screening",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    href: "/providers",
    icon: MapPin,
    title: "Find Care Near You",
    description:
      "Search for providers and programs in your area. From outpatient support to residential care — whatever fits your life.",
    cta: "Search Nearby",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    href: "/learn",
    icon: BookOpen,
    title: "Learn at Your Own Pace",
    description:
      "Straightforward articles about what care looks like, what to expect, and how to support someone you love.",
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
              You deserve to feel{" "}
              <span className="text-primary-600">Covered.</span>
            </h1>
            <p className="mt-6 text-lg text-warm-600 leading-relaxed">
              Life gets complicated. Whether you&apos;re questioning your own
              relationship with substances or looking out for someone you care
              about, we&apos;re here with free tools, real information, and zero
              judgment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/screen">
                <Button size="lg">
                  Check In With Yourself
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/providers">
                <Button variant="outline" size="lg">
                  Find Care Near You
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
            Three ways we&apos;ve got your back
          </h2>
          <p className="mt-3 text-warm-500 max-w-2xl mx-auto">
            No accounts, no data stored, no strings attached. Just tools
            that meet you where you are.
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
              Built on data you can trust
            </h2>
            <p className="mt-3 text-sm text-warm-500">
              Provider information comes directly from SAMHSA&apos;s
              FindTreatment.gov — the official U.S. government resource for
              finding care. Screenings use validated instruments from the World
              Health Organization and other leading health bodies. We just make
              it easier to access.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
