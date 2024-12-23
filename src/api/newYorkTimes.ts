import { News, Category } from "@/types";
import { format } from "date-fns";
import axios, { AxiosResponse } from "axios";

interface NYTArticle {
  web_url: string;
  snippet: string;
  print_page?: number;
  print_section?: string;
  source: string;
  headline: {
    main: string;
    [key: string]: unknown;
  };
  pub_date: string;
  news_desk: string;
  section_name: string;
  byline: {
    original: string;
    person: Array<{
      firstname: string;
      lastname: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  word_count: number;
  uri: string;
}

interface NYTResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

const NEW_YORK_TIMES_API = import.meta.env.VITE_NEW_YORK_TIMES_API;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

/**
 * Fetches news articles from the NYT API based on query, date, and category.
 * @param {string} query - The search query for the news articles.
 * @param {Date} [date] - The specific date to filter news articles.
 * @param {string} [category] - The category to filter news articles by.
 * @returns {Promise<Array<News>>} - A promise that resolves to an array of news articles.
 * @throws {Error} - Throws an error if the API request fails or if environment variables are not set.
 */
export const fetchNewsFromNewYorkTimes = async (
  query: string,
  date?: Date,
  category?: Category
): Promise<News[]> => {
  if (!NEW_YORK_TIMES_API || !NYT_API_KEY) {
    throw new Error(
      "NEW_YORK_TIMES_API or NYT_API_KEY is not set in the environment variables."
    );
  }

  const params: Record<string, string> = {
    "api-key": NYT_API_KEY,
    q: query,
  };

  if (category) {
    params.q = category;
  }

  if (date) {
    const formattedDate = format(date, "yyyyMMdd");
    params.begin_date = formattedDate;
    params.end_date = formattedDate;
  }

  try {
    const response: AxiosResponse<NYTResponse> = await axios.get(
      NEW_YORK_TIMES_API,
      {
        params,
      }
    );

    const data = response.data;

    return data.response.docs.map((article) => ({
      title: article.headline.main,
      description: article.snippet,
      publishedAt: article.pub_date,
      url: article.web_url,
      author: article.byline?.person?.[0]
        ? `${article.byline.person[0].firstname || ""} ${
            article.byline.person[0].lastname || ""
          }`.trim() || "Unknown"
        : "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching news from NewsOrg API:", error);
    throw error;
  }
};
