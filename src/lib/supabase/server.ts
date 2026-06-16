import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/types";

export function getSupabaseServerClient() {
  const { publishableKey, url } = getSupabaseConfig();

  return createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: false,
    },
  });
}
