import { useGetNews } from "@/hooks/use-get-news";
import { ArticleCard } from "./ArticleCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ArticleListProps {
  personalized?: boolean;
}

// Loading state component for a single skeleton card
export function ArticleCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-7 bg-gray-200 rounded-md animate-pulse w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Description lines */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading state component with multiple skeleton cards
export function ArticleListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * Displays a list of articles or a loading state while fetching the articles.
 * The component fetches articles and displays them in a list. If articles are still loading,
 * a loading skeleton is shown. If no articles are found, a message is displayed to the user.
 */
export function ArticleList({ personalized = false }: ArticleListProps) {
  const { data, isLoading } = useGetNews({ personalized });

  // Return loading skeleton if data is still being fetched
  if (isLoading) return <ArticleListSkeleton />;

  // Return a message if no articles are found
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <AlertTriangle className="text-gray-400 text-6xl" />
        <h2 className="text-xl font-semibold text-gray-700">
          No articles found
        </h2>
        <p className="text-gray-500">
          We're sorry, but there are no articles at the moment. Please check
          back later.
        </p>
      </div>
    );
  }

  // Return the list of articles if data is available
  return (
    <div className="space-y-6">
      {data.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
}
