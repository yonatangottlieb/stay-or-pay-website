(function (global) {
  "use strict";

  /** @type {readonly string[]} */
  var SUPPORTED_LOCALES = ["en", "he"];

  /** @type {readonly string[]} */
  var RTL_LOCALES = ["he"];

  /** @type {Record<string, string>} */
  var DEFAULT_LOCALE = "en";

  /**
   * @param {string | undefined | null} raw
   * @returns {string}
   */
  function normalizeLocale(raw) {
    if (!raw) {
      return DEFAULT_LOCALE;
    }

    var base = raw.toLowerCase().split("-")[0];
    if (SUPPORTED_LOCALES.indexOf(base) !== -1) {
      return base;
    }

    return DEFAULT_LOCALE;
  }

  /**
   * Detect preferred locale from browser settings.
   * Hebrew browsers -> he, everything else -> en.
   * @returns {string}
   */
  function detectBrowserLocale() {
    var languages = global.navigator.languages || [global.navigator.language];

    for (var i = 0; i < languages.length; i += 1) {
      var candidate = normalizeLocale(languages[i]);
      if (candidate === "he") {
        return "he";
      }
    }

    return DEFAULT_LOCALE;
  }

  /**
   * @param {string} locale
   * @returns {"ltr" | "rtl"}
   */
  function directionForLocale(locale) {
    return RTL_LOCALES.indexOf(locale) !== -1 ? "rtl" : "ltr";
  }

  /**
   * @param {string} docSlug
   * @param {string} locale
   * @returns {string}
   */
  function buildDocPath(docSlug, locale) {
    return "/" + docSlug + "/" + normalizeLocale(locale) + "/";
  }

  /**
   * @param {string} docSlug
   * @returns {string}
   */
  function buildLocalizedDocPath(docSlug) {
    return buildDocPath(docSlug, detectBrowserLocale());
  }

  global.StayOrPayI18n = {
    SUPPORTED_LOCALES: SUPPORTED_LOCALES,
    RTL_LOCALES: RTL_LOCALES,
    DEFAULT_LOCALE: DEFAULT_LOCALE,
    normalizeLocale: normalizeLocale,
    detectBrowserLocale: detectBrowserLocale,
    directionForLocale: directionForLocale,
    buildDocPath: buildDocPath,
    buildLocalizedDocPath: buildLocalizedDocPath,
  };
})(window);
