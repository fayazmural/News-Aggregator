import { fetchNewsFromGuardian } from "@/api/guadrian";
import { fetchNewsFromNewsOrg } from "@/api/newsOrg";
import { fetchNewsFromNewYorkTimes } from "@/api/newYorkTimes";
import { Category, News, Source } from "@/types";

interface NewsParams {
  query: string;
  date?: Date;
  category?: Category | Category[];
  source?: Source | Source[];
  personalized?: boolean;
}

export const getNews = async ({
  query,
  date,
  category,
  source,
  personalized = false,
}: NewsParams): Promise<News[]> => {
  try {
    let sourcesToFetch: Source[] = [];
    let categoriesToFetch: Category[] = [];

    if (personalized) {
      try {
        // Retrieve personalized settings from localStorage
        const personalizedCat: Category[] = JSON.parse(
          localStorage.getItem("preferredCategories") || "[]"
        );
        const personalizedSource: Source[] = JSON.parse(
          localStorage.getItem("preferredSources") || "[]"
        );

        sourcesToFetch =
          personalizedSource.length > 0 ? personalizedSource : [];
        categoriesToFetch = personalizedCat.length > 0 ? personalizedCat : [];
      } catch (error) {
        console.error("Error parsing personalized settings:", error);
        // Fall back to defaults if localStorage parsing fails
        sourcesToFetch = [];
        categoriesToFetch = [];
      }
    } else {
      sourcesToFetch = source
        ? Array.isArray(source)
          ? source
          : [source]
        : [Source.NewsOrg, Source.NYT, Source.Guardian];

      categoriesToFetch = category
        ? Array.isArray(category)
          ? category
          : [category]
        : [];
    }

    // If no categories specified, fetch without category filter
    if (categoriesToFetch.length === 0 && !personalized) {
      const newsPromises = sourcesToFetch.map((src) => {
        switch (src) {
          case Source.NewsOrg:
            return fetchNewsFromNewsOrg(query, date);
          case Source.NYT:
            return fetchNewsFromNewYorkTimes(query, date);
          case Source.Guardian:
            return fetchNewsFromGuardian(query, date);
          default:
            return Promise.resolve([]);
        }
      });

      const results = await Promise.allSettled(newsPromises);
      return results
        .filter(
          (result): result is PromiseFulfilledResult<News[]> =>
            result.status === "fulfilled"
        )
        .flatMap((result) => result.value);
    }

    // Fetch with category filters
    const newsPromises = sourcesToFetch.flatMap((src) =>
      categoriesToFetch.map((cat) => {
        switch (src) {
          case Source.NewsOrg:
            return fetchNewsFromNewsOrg(query, date, cat);
          case Source.NYT:
            return fetchNewsFromNewYorkTimes(query, date, cat);
          case Source.Guardian:
            return fetchNewsFromGuardian(query, date, cat);
          default:
            return Promise.resolve([]);
        }
      })
    );

    const results = await Promise.allSettled(newsPromises);
    return results
      .filter(
        (result): result is PromiseFulfilledResult<News[]> =>
          result.status === "fulfilled"
      )
      .flatMap((result) => result.value);
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};
