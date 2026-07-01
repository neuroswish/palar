import { searchExa, type ExaSearchOptions, type ExaSearchResponse } from "@/lib/exa";

export const DEFAULT_AI_SEARCH_PROVIDER = "exa";

export type AiSearchOptions = ExaSearchOptions;
export type AiSearchResponse = ExaSearchResponse;

export async function searchForAi(options: AiSearchOptions, init?: RequestInit) {
  return searchExa(options, init);
}
