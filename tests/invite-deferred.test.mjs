import test from "node:test";
import assert from "node:assert/strict";
import {
  ANDROID_PACKAGE_ID,
  buildAppDeepLink,
  buildHttpsInviteLink,
  buildPlayStoreListingUrl,
  buildPlayStoreReferrer,
  extractInviteCode,
  isValidInviteCode,
  normalizeInviteCode,
  PLAY_STORE_LISTING_BASE_URL,
} from "../assets/js/invite-link-utils.mjs";

const EXAMPLE_UUID = "11111111-2222-3333-4444-555555555555";

test("valid invite code parsed from query string", () => {
  const code = extractInviteCode(`?code=${EXAMPLE_UUID}`, "/invite/");
  assert.equal(code, EXAMPLE_UUID);
  assert.equal(isValidInviteCode(code), true);
});

test("valid invite code parsed from legacy path segment", () => {
  const code = extractInviteCode("", `/invite/${EXAMPLE_UUID}`);
  assert.equal(code, EXAMPLE_UUID);
});

test("UUID is preserved exactly after normalization", () => {
  const upper = EXAMPLE_UUID.toUpperCase();
  assert.equal(normalizeInviteCode(upper), EXAMPLE_UUID);
  assert.equal(normalizeInviteCode(`  ${EXAMPLE_UUID}  `), EXAMPLE_UUID);
});

test("Play Store URL contains encoded invite_code referrer", () => {
  const url = buildPlayStoreListingUrl(EXAMPLE_UUID);
  assert.ok(url);
  assert.match(url, /^https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.stayorpay\.app&referrer=/);

  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get("id"), ANDROID_PACKAGE_ID);
  assert.equal(
    parsed.searchParams.get("referrer"),
    buildPlayStoreReferrer(EXAMPLE_UUID),
  );
  assert.equal(parsed.searchParams.get("referrer"), `invite_code=${EXAMPLE_UUID}`);
});

test("Play URL never loses referrer for valid invite", () => {
  const url = buildPlayStoreListingUrl(EXAMPLE_UUID);
  assert.ok(url);
  assert.match(url, /referrer=invite_code/);
  assert.ok(url.includes(encodeURIComponent(EXAMPLE_UUID)));
  assert.equal(
    url,
    `${PLAY_STORE_LISTING_BASE_URL}&referrer=${encodeURIComponent(`invite_code=${EXAMPLE_UUID}`)}`,
  );
});

test("Open App deep link and https invite link preserve code", () => {
  assert.equal(
    buildAppDeepLink(EXAMPLE_UUID),
    `stayorpay://invite?code=${encodeURIComponent(EXAMPLE_UUID)}`,
  );
  assert.equal(
    buildHttpsInviteLink(EXAMPLE_UUID),
    `https://stayorpay.app/invite/?code=${encodeURIComponent(EXAMPLE_UUID)}`,
  );
});

test("share URL remains website invite URL, not Play Store", () => {
  const shareUrl = buildHttpsInviteLink(EXAMPLE_UUID);
  assert.match(shareUrl, /^https:\/\/stayorpay\.app\/invite\/\?code=/);
  assert.doesNotMatch(shareUrl, /play\.google\.com/);
  assert.doesNotMatch(shareUrl, /referrer=/);
});

test("missing code returns empty extraction", () => {
  assert.equal(extractInviteCode("", "/invite/"), "");
  assert.equal(extractInviteCode("?code=", "/invite/"), "");
});

test("invalid code is rejected and cannot build Play Store referrer URL", () => {
  assert.equal(extractInviteCode("?code=not-a-uuid", "/invite/"), "");
  assert.equal(isValidInviteCode("not-a-uuid"), false);
  assert.equal(buildPlayStoreListingUrl("not-a-uuid"), null);
  assert.equal(buildPlayStoreListingUrl(""), null);
});

test("invite page wires bootstrap, deferred scripts, and Play Store resolver", async () => {
  const { readFileSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const { dirname, join } = await import("node:path");
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const html = readFileSync(join(root, "invite/index.html"), "utf8");
  const playStoreCta = readFileSync(join(root, "assets/js/play-store-cta.js"), "utf8");
  const inviteJs = readFileSync(join(root, "assets/js/invite.js"), "utf8");

  assert.match(html, /invite-bootstrap\.mjs/);
  assert.match(html, /defer src="\/assets\/js\/invite\.js"/);
  assert.match(playStoreCta, /resolvePlayStoreUrl/);
  assert.match(playStoreCta, /data-invite-code/);
  assert.match(inviteJs, /setInviteCodeContext/);
  assert.match(inviteJs, /refreshPlayStoreControls/);
});
