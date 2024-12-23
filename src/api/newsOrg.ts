import { Category, News } from "@/types";
import axios, { AxiosResponse } from "axios";

export interface Response {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: null | string;
  title: string;
  description: null | string;
  url: string;
  urlToImage: null | string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id: null | string;
  name: string;
}

const NEWS_ORG_API = import.meta.env.VITE_NEWS_ORG_API;
const NEWS_ORG_API_KEY = import.meta.env.VITE_NEWS_ORG_API_KEY;

/**
 * Fetches news articles from the News Org API based on query, date, and category.
 * @param {string} query - The search query for the news articles.
 * @param {Date} [date] - The specific date to filter news articles.
 * @param {string} [category] - The category to filter news articles by.
 * @returns {Promise<Array<News>>} - A promise that resolves to an array of news articles.
 * @throws {Error} - Throws an error if the API request fails or if environment variables are not set.
 */
export const fetchNewsFromNewsOrg = async (
  query: string,
  date?: Date,
  category?: Category
): Promise<News[]> => {
  if (!NEWS_ORG_API_KEY || !NEWS_ORG_API) {
    throw new Error(
      "NEWS_ORG_API_KEY or NEWS_ORG_API is not set in the environment variables."
    );
  }

  const params: Record<string, string> = {
    apiKey: NEWS_ORG_API_KEY,
    q: query,
  };

  if (category) {
    params.q = category;
  }

  if (date) {
    params.from = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    params.to = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
  }

  try {
    const response: AxiosResponse<Response> = await axios.get(NEWS_ORG_API, {
      params,
    });

    const data = response.data;

    return data.articles
      .map((article) => ({
        title: article.title,
        description: article.description ?? "",
        publishedAt: article.publishedAt,
        url: article.url,
        author: article.author ?? "Unknown",
      }))
      .filter((article) => article.title !== "[Removed]");
  } catch (error) {
    console.error("Error fetching news from NewsOrg API:", error);
    throw error;
  }
};
