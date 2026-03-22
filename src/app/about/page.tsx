import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Covered — free, open-source tools that have your back when it comes to substance use and mental health care.",
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
            Why We Built This
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Stress and substances are part of life. Sometimes the relationship
            shifts, and you want to understand where you stand — or you want to
            help someone you care about. Covered exists to make that easier.
          </p>
          <p className="text-warm-600 leading-relaxed mt-3">
            We&apos;re a free, open-source set of tools designed to help you check
            in with yourself, find care near you, and learn at your own pace —
            without cost, without sign-up, and without judgment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Three Ways We&apos;ve Got Your Back
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-warm-600">
            <li>
              <strong>Check In:</strong> Quick, private self-assessments (AUDIT,
              DAST-10, CAGE) that help you reflect on your relationship with
              substances. They&apos;re not diagnoses — just a starting point for
              whatever comes next.
            </li>
            <li>
              <strong>Find Care:</strong> Search thousands of providers and
              programs near you, powered by SAMHSA&apos;s FindTreatment.gov — from
              counseling to residential care.
            </li>
            <li>
              <strong>Learn:</strong> Honest, approachable articles about
              substance use, treatment options, recovery, and supporting the
              people you care about.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Built on Data You Can Trust
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
            Your Privacy Comes First
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Covered does not collect, store, or transmit any personal data.
            Screening responses are processed entirely in your browser — they
            never leave your device. Provider searches are forwarded to
            SAMHSA&apos;s API on your behalf, and we don&apos;t log search queries.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-warm-900 mt-8 mb-3">
            Open Source & API
          </h2>
          <p className="text-warm-600 leading-relaxed">
            Covered is open-source. We also offer a public API so other apps and
            organizations can integrate these tools into their own platforms. See
            our{" "}
            <Link href="/api/v1" className="text-primary-600 underline hover:no-underline">
              API documentation
            </Link>{" "}
            for details.
          </p>
        </section>

        <section className="mt-12 p-6 bg-warm-50 border border-warm-200 rounded-lg">
          <h2 className="text-lg font-semibold text-warm-900 mb-2">
            A note
          </h2>
          <p className="text-sm text-warm-600">
            Covered is here to inform and support — it&apos;s not a substitute for
            professional medical advice, diagnosis, or treatment. A healthcare
            provider is always the best person to talk to about your specific
            situation. If you need to talk to someone right now, call{" "}
            <a href="tel:988" className="font-semibold text-crisis-600">
              988
            </a>{" "}
            (Suicide &amp; Crisis Lifeline) or{" "}
            <a href="tel:1-800-662-4357" className="font-semibold text-crisis-600">
              1-800-662-4357
            </a>{" "}
            (SAMHSA Helpline — free, 24/7).
          </p>
        </section>
      </div>
    </div>
  );
}
