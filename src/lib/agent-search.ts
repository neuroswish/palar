import { searchExa, type ExaSearchOptions, type ExaSearchResponse } from "@/lib/exa";

export const DEFAULT_AGENT_SEARCH_PROVIDER = "exa";

export type AgentSearchOptions = ExaSearchOptions;
export type AgentSearchResponse = ExaSearchResponse;

export async function searchForAgent(options: AgentSearchOptions, init?: RequestInit) {
  return searchExa(options, init);
}
