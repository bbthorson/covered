import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Educational resources about substance use disorders, treatment options, recovery, and supporting loved ones.",
};

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-warm-900">
          Learn About Substance Use Care
        </h1>
        <p className="mt-4 text-lg text-warm-500">
          Educational resources to help you understand substance use disorders,
          treatment options, recovery, and how to support loved ones.
        </p>
      </div>

      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-warm-400">
          Educational articles will be added in Phase 4.
        </p>
      </div>
    </div>
  );
}
