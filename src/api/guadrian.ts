import { Category, News } from "@/types";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { htmlToText } from "html-to-text";

interface GuardianResponse {
  response: {
    status: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: {
      id: string;
      webPublicationDate: string;
      webTitle: string;
      webUrl: string;
      fields: {
        body: string;
      };
      sectionName: string;
      type: string;
      pillarName: string;
    }[];
    blocks: unknown;
  };
}
const GAURDIAN_API = import.meta.env.VITE_GAURDIAN_API;
const GAURDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

/**
 * Fetches news articles from the Guardian API based on query, date, and category.
 * @param {string} query - The search query for the news articles.
 * @param {Date} [date] - The specific date to filter news articles.
 * @param {string} [category] - The category to filter news articles by.
 * @returns {Promise<Array<News>>} - A promise that resolves to an array of news articles.
 * @throws {Error} - Throws an error if the API request fails or if environment variables are not set.
 */
export const fetchNewsFromGuardian = async (
  query: string,
  date?: Date,
  category?: Category
): Promise<News[]> => {
  if (!GAURDIAN_API || !GAURDIAN_API_KEY) {
    throw new Error(
      "GAURDIAN_API or GAURDIAN_API_KEY is not set in the environment variables."
    );
  }

  const params: Record<string, string> = {
    "api-key": GAURDIAN_API_KEY,
    q: query,
    "show-fields": "body",
  };

  if (category) {
    params.q = category;
  }

  if (date) {
    const formattedDate = format(date, "yyyy-MM-dd");
    params["from-date"] = formattedDate;
    params["to-date"] = formattedDate;
  }

  try {
    const response: AxiosResponse<GuardianResponse> = await axios.get(
      GAURDIAN_API,
      {
        params,
      }
    );

    const data = response.data;

    return data.response.results.map((article) => ({
      title: article.webTitle,
      description: htmlToText(article.fields.body, {
        wordwrap: false,
      }),
      publishedAt: article.webPublicationDate,
      url: article.webUrl,
      author: "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching news from NewsOrg API:", error);
    throw error;
  }
};
