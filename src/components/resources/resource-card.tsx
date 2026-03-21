import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/content";

interface ResourceCardProps {
  article: ArticleMeta;
}

export function ResourceCard({ article }: ResourceCardProps) {
  return (
    <Link href={`/learn/${article.slug}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardContent className="p-5 flex flex-col h-full">
          <Badge variant="outline" className="self-start mb-3">
            {article.category}
          </Badge>
          <h3 className="font-semibold text-warm-900 text-lg">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-warm-500 flex-1">
            {article.description}
          </p>
          <div className="mt-4 flex items-center text-sm text-primary-600 font-medium">
            Read article
            <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
