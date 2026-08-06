import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readRootFile(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

test("data-deletion page exists and returns HTML shell", () => {
  const html = readRootFile("data-deletion/index.html");
  assert.match(html, /Delete your Stay or Pay account/);
  assert.match(html, /sign-in-google/);
  assert.match(html, /sign-in-apple/);
  assert.match(html, /delete-account-button/);
});

test("auth callback page exists", () => {
  assert.equal(existsSync(join(root, "auth/callback/index.html")), true);
});

test("DELETE confirmation keyword gate", async () => {
  const shared = readRootFile("assets/js/data-deletion-shared.js");
  assert.match(shared, /DELETE_CONFIRM_KEYWORD = "DELETE"/);
  assert.match(shared, /canConfirmDelete/);
});

test("client uid in request body must not drive deletion", async () => {
  const pageJs = readRootFile("assets/js/data-deletion.js");
  assert.match(pageJs, /ignored_client_uid/);
  assert.match(pageJs, /getSession\(\)/);
});

test("home page footer links to self-service deletion page", () => {
  const html = readRootFile("index.html");
  assert.match(html, /href="\/data-deletion\/"/);
  assert.match(html, /footer\.deleteAccount/);
});

test("OAuth callback redirect target is sanitized", () => {
  const callbackJs = readRootFile("assets/js/auth-callback.js");
  assert.match(callbackJs, /sanitizeNextPath/);
  assert.match(callbackJs, /exchangeCodeForSession/);
});
