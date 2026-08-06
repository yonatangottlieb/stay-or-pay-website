export const STORAGE_KEY = "stayorpay.web.auth";

export function readConfig() {
  const config = globalThis.StayOrPaySupabaseConfig || {};
  const url = typeof config.url === "string" ? config.url.trim() : "";
  const anonKey = typeof config.anonKey === "string" ? config.anonKey.trim() : "";
  if (!url || !anonKey || url.includes("YOUR_PROJECT")) {
    return null;
  }
  return { url, anonKey };
}

export async function loadBrowserClient() {
  const config = readConfig();
  if (!config) {
    return null;
  }

  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.49.1");
  return createClient(config.url, config.anonKey, {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: false,
      persistSession: true,
      autoRefreshToken: true,
      storage: globalThis.sessionStorage,
      storageKey: STORAGE_KEY,
    },
  });
}

export function getFunctionsBaseUrl() {
  const config = readConfig();
  return config ? `${config.url}/functions/v1` : "";
}
