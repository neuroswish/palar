const EXA_SEARCH_URL = "https://api.exa.ai/search";

type ExaSearchType = "auto" | "keyword" | "neural";

type ExaTextContents =
  | boolean
  | {
      maxCharacters?: number;
    };

export type ExaSearchOptions = {
  contents?: {
    highlights?: boolean;
    text?: ExaTextContents;
  };
  endPublishedDate?: string;
  excludeDomains?: string[];
  includeDomains?: string[];
  numResults?: number;
  query: string;
  startPublishedDate?: string;
  type?: ExaSearchType;
};

export type ExaSearchResult = {
  author?: string;
  highlights?: string[];
  id?: string;
  publishedDate?: string;
  score?: number;
  text?: string;
  title?: string;
  url: string;
};

export type ExaSearchResponse = {
  autopromptString?: string;
  requestId?: string;
  results: ExaSearchResult[];
};

export function isExaConfigured() {
  return Boolean(process.env.EXA_API_KEY);
}

function getExaApiKey() {
  const apiKey = process.env.EXA_API_KEY;

  if (!apiKey) {
    throw new Error("Exa is not configured. Set EXA_API_KEY.");
  }

  return apiKey;
}

export async function searchExa(options: ExaSearchOptions, init?: RequestInit) {
  if (typeof window !== "undefined") {
    throw new Error("Exa search must only run on the server.");
  }

  const { contents = { text: { maxCharacters: 1200 } }, numResults = 5, query, type = "auto", ...rest } = options;

  const response = await fetch(EXA_SEARCH_URL, {
    ...init,
    body: JSON.stringify({
      contents,
      numResults,
      query,
      type,
      ...rest,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": getExaApiKey(),
      ...init?.headers,
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorText = await response.text();
    const message = errorText ? ` Exa response: ${errorText.slice(0, 500)}` : "";

    throw new Error(`Exa search failed with status ${response.status}.${message}`);
  }

  return (await response.json()) as ExaSearchResponse;
}
