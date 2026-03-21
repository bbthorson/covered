import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getCategories } from "@/lib/content";
import { LearnHub } from "./learn-hub";
import { Search, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Educational resources about substance use disorders, treatment options, recovery, and supporting loved ones.",
};

export default async function LearnPage() {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getCategories(),
  ]);

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

      {/* Cross-links */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/screen"
          className="flex-1 p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3 hover:bg-primary-100 transition-colors"
        >
          <ClipboardCheck
            className="h-5 w-5 text-primary-600 shrink-0"
            aria-hidden="true"
          />
          <span className="text-sm text-primary-800">
            <strong>Take a screening</strong> to understand your risk level
          </span>
        </Link>
        <Link
          href="/providers"
          className="flex-1 p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3 hover:bg-primary-100 transition-colors"
        >
          <Search
            className="h-5 w-5 text-primary-600 shrink-0"
            aria-hidden="true"
          />
          <span className="text-sm text-primary-800">
            <strong>Find providers</strong> near you
          </span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        <LearnHub articles={articles} categories={categories} />
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center text-xs text-warm-400">
        <p>
          Content sourced from SAMHSA publications and peer-reviewed research.
          See individual articles for specific citations.
        </p>
      </div>
    </div>
  );
}
