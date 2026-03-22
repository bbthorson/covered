import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, ClipboardCheck } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { content } = await compileMDX({
    source: article.content,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/learn">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Resources
        </Button>
      </Link>

      <article>
        <header className="mb-8">
          <p className="text-sm text-primary-600 font-medium mb-2">
            {article.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-warm-900">
            {article.title}
          </h1>
          <p className="mt-3 text-lg text-warm-500">{article.description}</p>
        </header>

        <div className="prose prose-warm max-w-none">{content}</div>

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <footer className="mt-12 pt-6 border-t border-warm-200">
            <h2 className="text-sm font-semibold text-warm-700 mb-3">
              Sources
            </h2>
            <ol className="list-decimal list-inside space-y-1">
              {article.sources.map((source, i) => (
                <li key={i} className="text-xs text-warm-500">
                  {source}
                </li>
              ))}
            </ol>
          </footer>
        )}
      </article>

      {/* Cross-links */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Link
          href="/screen"
          className="flex-1 p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3 hover:bg-primary-100 transition-colors"
        >
          <ClipboardCheck
            className="h-5 w-5 text-primary-600 shrink-0"
            aria-hidden="true"
          />
          <span className="text-sm text-primary-800">
            <strong>Check in with yourself</strong> — a quick, private self-assessment
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
            <strong>Find care</strong> near you
          </span>
        </Link>
      </div>
    </div>
  );
}
