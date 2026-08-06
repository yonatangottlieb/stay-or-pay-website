import { loadBrowserClient } from "./supabase-browser.js";

function sanitizeNextPath(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/data-deletion/";
  }
  return value;
}

async function boot() {
  const params = new URLSearchParams(window.location.search);
  const nextPath = sanitizeNextPath(params.get("next"));
  const errorDescription = params.get("error_description");

  if (errorDescription) {
    window.location.replace("/data-deletion/?auth_error=1");
    return;
  }

  const supabase = await loadBrowserClient();
  if (!supabase) {
    window.location.replace("/data-deletion/?config_error=1");
    return;
  }

  const code = params.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      window.location.replace("/data-deletion/?auth_error=1");
      return;
    }
  }

  window.location.replace(nextPath);
}

boot();
