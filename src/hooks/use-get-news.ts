import { getNews } from "@/services/news";
import { Category, Source } from "@/types";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface useGetNewsProps {
  personalized?: boolean;
}

/**
 * Custom hook to fetch news articles based on query parameters and personalization.
 * @param {boolean} [props.personalized=false] - Whether to fetch personalized news. Defaults to false.
 * @returns {Object} - The result of the React Query `useQuery` hook, which contains the news data or loading/error state.
 */
export function useGetNews({ personalized }: useGetNewsProps) {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const query = queryParameters.get("q") ?? "any";
  const date = queryParameters.get("date")
    ? new Date(queryParameters.get("date")!)
    : undefined;
  const category = queryParameters.get("category") as Category | undefined;
  const source = queryParameters.get("source") as Source | undefined;
  function fetchNews() {
    return getNews({ query, date, category, source, personalized });
  }
  return useQuery({
    queryKey: ["news", query, date, category, source, personalized],
    queryFn: fetchNews,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
