export enum Category {
  Business = "business",
  Entertainment = "entertainment",
  Sports = "sports",
  Politics = "politics",
  Technology = "technology",
  Any = "any",
}

export enum Source {
  NYT = "nyt",
  NewsOrg = "newsOrg",
  Guardian = "guardian",
}

export interface News {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  author?: string | null;
}
