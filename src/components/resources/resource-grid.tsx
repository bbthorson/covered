import { ResourceCard } from "./resource-card";
import type { ArticleMeta } from "@/lib/content";

interface ResourceGridProps {
  articles: ArticleMeta[];
}

export function ResourceGrid({ articles }: ResourceGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-warm-500">No articles found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ResourceCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
