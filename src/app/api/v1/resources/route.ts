import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let articles = await getAllArticles();

  if (category) {
    articles = articles.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json(
    {
      data: articles,
      meta: {
        totalCount: articles.length,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
