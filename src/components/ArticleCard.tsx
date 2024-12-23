import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { News } from "@/types";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";

interface ArticleCardProps {
  article: News;
}

/**
 * `ArticleCard` component that displays an article's title, description, and metadata.
 * This component presents an article with its title, a truncated description, publication date,
 * and author. The description is truncated to a specified length and can be fully viewed in a tooltip.
 * The article also includes a link to open the full article in a new tab.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {article.title}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label="Open article"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-500 mb-4 cursor-help">
                {truncateDescription(article.description, 300)}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>{article.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
          {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
          <div className="text-sm">By {article.author}</div>
        </div>
      </CardContent>
    </Card>
  );
}
