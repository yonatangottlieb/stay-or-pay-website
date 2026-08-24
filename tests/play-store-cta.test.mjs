import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

test("app store config uses verified Android package id", () => {
  const config = read("assets/js/app-store-config.js");
  assert.match(config, /com\.stayorpay\.app/);
  assert.match(
    config,
    /PLAY_STORE_URL = PLAY_STORE_LISTING_BASE/,
  );
  assert.match(config, /PLAY_STORE_LISTING_BASE/);
  assert.match(config, /store\/apps\/details\?id=/);
});

test("home page exposes Play Store CTAs and Android banner", () => {
  const html = read("index.html");
  assert.match(html, /data-play-store-cta/);
  assert.match(html, /id="android-play-banner"/);
  assert.match(html, /app-store-config\.js/);
  assert.match(html, /play-store-cta\.js/);
  assert.match(html, /Download from Google Play/);
  assert.doesNotMatch(html, /play\.google\.com\/store\//);
});

test("invite page uses shared Play Store config instead of hardcoded URL", () => {
  const html = read("invite/index.html");
  assert.match(html, /data-play-store-cta/);
  assert.match(html, /app-store-config\.js/);
  assert.match(html, /play-store-cta\.js/);
  assert.doesNotMatch(html, /play\.google\.com\/store\//);
});

test("data-deletion and auth-related pages still exist", () => {
  assert.equal(existsSync(join(root, "data-deletion/index.html")), true);
  assert.equal(existsSync(join(root, "oauth/callback/index.html")), true);
});

test("no auto-redirect to Play Store in CTA scripts", () => {
  const cta = read("assets/js/play-store-cta.js");
  assert.doesNotMatch(cta, /location\.href\s*=\s*url/);
  assert.doesNotMatch(cta, /location\.replace/);
  assert.match(cta, /No automatic redirects/);
});
