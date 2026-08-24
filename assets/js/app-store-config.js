/**
 * Single source of truth for app store links on stayorpay.app.
 *
 * Base listing URL (no referrer). The invite page appends an invite_code
 * referrer for deferred partner installs; home and other pages use this base URL.
 */
(function (global) {
  "use strict";

  var ANDROID_PACKAGE_ID = "com.stayorpay.app";

  var PLAY_STORE_LISTING_BASE =
    "https://play.google.com/store/apps/details?id=" + ANDROID_PACKAGE_ID;

  /** @type {string|null} */
  var PLAY_STORE_URL = PLAY_STORE_LISTING_BASE;

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
    // iPadOS 13+ may report as Mac; treat touch Macs with no Android as iOS-like.
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
    return typeof PLAY_STORE_URL === "string" && PLAY_STORE_URL.trim().length > 0;
  }

  function getPlayStoreUrl() {
    if (!isPlayStoreAvailable()) {
      return null;
    }
    return PLAY_STORE_URL.trim();
  }

  global.StayOrPayAppStore = {
    androidPackageId: ANDROID_PACKAGE_ID,
    playStoreListingBase: PLAY_STORE_LISTING_BASE,
    playStoreUrl: PLAY_STORE_URL,
    detectPlatform: detectPlatform,
    isPlayStoreAvailable: isPlayStoreAvailable,
    getPlayStoreUrl: getPlayStoreUrl,
  };
})(window);
