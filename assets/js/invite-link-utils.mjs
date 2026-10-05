/** @typedef {import('./invite-link-utils.mjs')} InviteLinkUtils */

export const ANDROID_PACKAGE_ID = "com.stayorpay.app";

export const PLAY_STORE_LISTING_BASE_URL =
  "https://play.google.com/store/apps/details?id=" + ANDROID_PACKAGE_ID;

export const INVITE_WEB_BASE_URL = "https://stayorpay.app/invite/";

export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * @param {string | null | undefined} raw
 * @returns {boolean}
 */
export function isValidInviteCode(raw) {
  if (!raw || typeof raw !== "string") {
    return false;
  }
  return UUID_PATTERN.test(raw.trim());
}

/**
 * @param {string | null | undefined} raw
 * @returns {string}
 */
export function normalizeInviteCode(raw) {
  if (!isValidInviteCode(raw)) {
    return "";
  }
  return raw.trim().toLowerCase();
}

/**
 * @param {string | null | undefined} search
 * @param {string | null | undefined} pathname
 * @returns {string}
 */
export function extractInviteCode(search, pathname) {
  const params = new URLSearchParams(search || "");
  const fromQuery = params.get("code");
  if (isValidInviteCode(fromQuery)) {
    return normalizeInviteCode(fromQuery);
  }

  const segments = (pathname || "").split("/").filter(Boolean);
  const inviteIndex = segments.indexOf("invite");
  if (inviteIndex !== -1 && segments.length > inviteIndex + 1) {
    const fromPath = segments[inviteIndex + 1];
    if (isValidInviteCode(fromPath)) {
      return normalizeInviteCode(fromPath);
    }
  }

  return "";
}

/**
 * @param {string} inviteCode
 * @returns {string}
 */
export function buildPlayStoreReferrer(inviteCode) {
  return "invite_code=" + normalizeInviteCode(inviteCode);
}

/**
 * Play Store listing URL with Install Referrer for deferred partner invites.
 * Returns null when the invite code is missing or invalid.
 *
 * @param {string} inviteCode
 * @returns {string | null}
 */
export function buildPlayStoreListingUrl(inviteCode) {
  const normalized = normalizeInviteCode(inviteCode);
  if (!normalized) {
    return null;
  }
  const referrer = buildPlayStoreReferrer(normalized);
  return (
    PLAY_STORE_LISTING_BASE_URL +
    "&referrer=" +
    encodeURIComponent(referrer)
  );
}

/**
 * @param {string} inviteCode
 * @returns {string}
 */
export function buildAppDeepLink(inviteCode) {
  const normalized = normalizeInviteCode(inviteCode);
  if (!normalized) {
    return "";
  }
  return "stayorpay://invite?code=" + encodeURIComponent(normalized);
}

/**
 * Canonical website invite link used in SMS/WhatsApp shares (not Play Store).
 *
 * @param {string} inviteCode
 * @returns {string}
 */
export function buildHttpsInviteLink(inviteCode) {
  const normalized = normalizeInviteCode(inviteCode);
  if (!normalized) {
    return "";
  }
  return INVITE_WEB_BASE_URL + "?code=" + encodeURIComponent(normalized);
}
