"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/resources/category-filter";
import { ResourceGrid } from "@/components/resources/resource-grid";
import type { ArticleMeta } from "@/lib/content";

interface LearnHubProps {
  articles: ArticleMeta[];
  categories: string[];
}

export function LearnHub({ articles, categories }: LearnHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  return (
    <>
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <ResourceGrid articles={filtered} />
    </>
  );
}
