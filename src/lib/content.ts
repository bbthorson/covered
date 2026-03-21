import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/resources");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  sources?: string[];
}

export interface Article extends ArticleMeta {
  content: string;
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const articles = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = await fs.readFile(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "general",
        order: data.order ?? 99,
        sources: data.sources,
      } as ArticleMeta;
    })
  );

  return articles.sort((a, b) => a.order - b.order);
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "general",
      order: data.order ?? 99,
      sources: data.sources,
      content,
    };
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const categories = [...new Set(articles.map((a) => a.category))];
  return categories.sort();
}
