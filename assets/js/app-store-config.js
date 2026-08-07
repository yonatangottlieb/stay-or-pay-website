/**
 * Single source of truth for app store links on stayorpay.app.
 *
 * When Closed Testing / production listing is live, set playStoreUrl to:
 *   https://play.google.com/store/apps/details?id=com.stayorpay.app
 * (package id verified from the Flutter Android applicationId).
 *
 * Keep playStoreUrl null until the listing is publicly reachable.
 */
(function (global) {
  "use strict";

  var ANDROID_PACKAGE_ID = "com.stayorpay.app";

  /** @type {string|null} */
  var PLAY_STORE_URL = null;

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
    playStoreUrl: PLAY_STORE_URL,
    detectPlatform: detectPlatform,
    isPlayStoreAvailable: isPlayStoreAvailable,
    getPlayStoreUrl: getPlayStoreUrl,
  };
})(window);
