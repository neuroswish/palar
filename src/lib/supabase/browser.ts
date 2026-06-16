"use client";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/types";

let browserClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const { publishableKey, url } = getSupabaseConfig();
    browserClient = createClient<Database>(url, publishableKey);
  }

  return browserClient;
}
