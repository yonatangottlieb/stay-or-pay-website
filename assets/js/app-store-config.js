/**
 * Single source of truth for app store links on stayorpay.app.
 *
 * Invite SMS always uses https://stayorpay.app/invite/?code=...
 * This file only controls the website Play Store CTA (never auto-redirect).
 *
 * DISTRIBUTION:
 *   closed_testing — listing exists but install is limited to testers.
 *   public         — anyone can install; same invite URL, referrer attribution.
 */
(function (global) {
  "use strict";

  var ANDROID_PACKAGE_ID = "com.stayorpay.app";

  /** @type {"closed_testing"|"public"} */
  var DISTRIBUTION = "closed_testing";

  var PLAY_STORE_LISTING_URL =
    "https://play.google.com/store/apps/details?id=" + ANDROID_PACKAGE_ID;

  /**
   * @returns {"android"|"ios"|"desktop"}
   */
  function detectPlatform() {
    var ua = global.navigator.userAgent || "";
    if (/android/i.test(ua)) {
      return "android";
    }
    if (/iPhone|iPad|iPod/i.test(ua)) {
      return "ios";
    }
    if (
      /Macintosh/i.test(ua) &&
      global.navigator.maxTouchPoints &&
      global.navigator.maxTouchPoints > 1
    ) {
      return "ios";
    }
    return "desktop";
  }

  function isPlayStoreAvailable() {
    return typeof PLAY_STORE_LISTING_URL === "string" &&
      PLAY_STORE_LISTING_URL.trim().length > 0;
  }

  function isClosedTesting() {
    return DISTRIBUTION === "closed_testing";
  }

  function getPlayStoreUrl() {
    if (!isPlayStoreAvailable()) {
      return null;
    }
    return PLAY_STORE_LISTING_URL.trim();
  }

  /**
   * @param {string} [inviteCode]
   * @returns {string|null}
   */
  function buildPlayStoreUrlWithReferrer(inviteCode) {
    var base = getPlayStoreUrl();
    if (!base) {
      return null;
    }
    if (!inviteCode) {
      return base;
    }
    var referrer = "invite_code=" + inviteCode;
    var separator = base.indexOf("?") >= 0 ? "&" : "?";
    return base + separator + "referrer=" + encodeURIComponent(referrer);
  }

  global.StayOrPayAppStore = {
    androidPackageId: ANDROID_PACKAGE_ID,
    distribution: DISTRIBUTION,
    playStoreUrl: PLAY_STORE_LISTING_URL,
    detectPlatform: detectPlatform,
    isPlayStoreAvailable: isPlayStoreAvailable,
    isClosedTesting: isClosedTesting,
    getPlayStoreUrl: getPlayStoreUrl,
    buildPlayStoreUrlWithReferrer: buildPlayStoreUrlWithReferrer,
  };
})(window);
