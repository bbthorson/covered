import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Covered — a free, open-source tool to help people find substance use care.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-warm-900 mb-8">
        About Covered
      </h1>

      <div className="prose prose-warm max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Our Mission
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Covered is a free, open-source application designed to help people
            navigate substance use care. We believe that access to screening
            tools, provider information, and educational resources should be
            available to everyone — without cost, without sign-up, and without
            stigma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            What We Provide
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-warm-600">
            <li>
              <strong>Screening Tools:</strong> Validated questionnaires (AUDIT,
              DAST-10, CAGE) to help you understand your risk level. These are
              not diagnoses — they are starting points for conversation with a
              healthcare provider.
            </li>
            <li>
              <strong>Provider Search:</strong> A search tool powered by
              SAMHSA&apos;s FindTreatment.gov API that helps you find substance use
              and mental health treatment facilities near you.
            </li>
            <li>
              <strong>Educational Resources:</strong> Articles sourced from
              SAMHSA and other trusted public health organizations to help you
              understand substance use disorders, treatment options, and recovery.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Data Sources
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Provider data comes from{" "}
            <a
              href="https://findtreatment.gov"
              className="text-primary-600 underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              FindTreatment.gov
            </a>
            , maintained by the Substance Abuse and Mental Health Services
            Administration (SAMHSA). Screening instruments are public domain
            tools developed and validated by organizations including the World
            Health Organization.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Privacy
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Covered does not collect, store, or transmit any personal data.
            Screening responses are processed entirely in your browser and are
            never sent to our servers. Provider searches are forwarded to
            SAMHSA&apos;s API on your behalf — we do not log search queries.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Open Source & API
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Covered is open-source and provides a public API so that other
            applications can integrate substance use care tools into their own
            platforms. See our{" "}
            <Link href="/api/v1" className="text-primary-600 underline hover:no-underline">
              API documentation
            </Link>{" "}
            for details.
          </p>
        </section>

        <section className="mt-12 p-6 bg-warm-50 border border-warm-200 rounded-lg">
          <h2 className="text-lg font-semibold text-warm-900 mb-2">
            Disclaimer
          </h2>
          <p className="text-sm text-warm-600">
            This tool is for informational purposes only and is not a substitute
            for professional medical advice, diagnosis, or treatment. Always seek
            the advice of a qualified healthcare provider with any questions you
            may have regarding a medical condition. If you are in crisis, please
            call{" "}
            <a href="tel:988" className="font-semibold text-crisis-600">
              988
            </a>{" "}
            (Suicide &amp; Crisis Lifeline) or{" "}
            <a href="tel:1-800-662-4357" className="font-semibold text-crisis-600">
              1-800-662-4357
            </a>{" "}
            (SAMHSA Helpline).
          </p>
        </section>
      </div>
    </div>
  );
}
