(function (global) {
  "use strict";

  /** @type {readonly string[]} */
  var SUPPORTED_LOCALES = ["en", "he"];

  /** @type {readonly string[]} */
  var RTL_LOCALES = ["he"];

  /** @type {string} */
  var DEFAULT_LOCALE = "en";

  /** @type {string} */
  var SITE_URL = "https://stayorpay.app";

  /** @type {Record<string, Record<string, string>>} */
  var HOME_COPY = {
    en: {
      pageTitle: "STAY OR PAY — Stay focused, or pay.",
      metaDescription:
        "STAY OR PAY helps you stay focused by turning your goals into real commitments. Create a focus session, stay until the timer ends, and keep your commitment.",
      metaKeywords:
        "stay or pay, focus app, accountability, commitment, productivity, focus session, goal tracking, startup",
      ogLocale: "en_US",
      heroHeadline: "Turn your commitment into a real commitment.",
      heroParagraph:
        "STAY OR PAY helps you stay focused by turning your goals into real commitments. Create a focus session, stay until the timer ends, and keep your commitment.",
      ctaLabel: "Coming soon on Google Play",
      aboutTitle: "About STAY OR PAY",
      aboutParagraph1:
        "STAY OR PAY is a focus and accountability platform designed to help people stay committed to what matters most.",
      aboutParagraph2:
        "Whether you are studying, working, exercising or building a business, STAY OR PAY helps you stay focused until your commitment is complete.",
      contactTitle: "Contact",
      contactIntro: "For support or privacy-related questions:",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms of Service",
      footerDataDeletion: "Data Deletion Policy",
    },
    he: {
      pageTitle: "STAY OR PAY — הישארו ממוקדים, או שלמו.",
      metaDescription:
        "STAY OR PAY עוזר לכם להישאר ממוקדים על ידי הפיכת המטרות שלכם למחויבויות אמיתיות. צרו סשן מיקוד, הישארו עד שהטיימר נגמר, ושמרו על המחויבות שלכם.",
      metaKeywords:
        "stay or pay, אפליקציית מיקוד, אחריות, מחויבות, פרודוקטיביות, סשן מיקוד, מטרות",
      ogLocale: "he_IL",
      heroHeadline: "הפכו את המחויבות שלכם למחויבות אמיתית.",
      heroParagraph:
        "STAY OR PAY עוזר לכם להישאר ממוקדים על ידי הפיכת המטרות שלכם למחויבויות אמיתיות. צרו סשן מיקוד, הישארו עד שהטיימר נגמר, ושמרו על המחויבות שלכם.",
      ctaLabel: "בקרוב ב-Google Play",
      aboutTitle: "אודות STAY OR PAY",
      aboutParagraph1:
        "STAY OR PAY היא פלטפורמת מיקוד ואחריות שנועדה לעזור לאנשים להישאר מחויבים למה שחשוב באמת.",
      aboutParagraph2:
        "בין אם אתם לומדים, עובדים, מתאמנים או בונים עסק, STAY OR PAY עוזר לכם להישאר ממוקדים עד שהמחויבות שלכם הושלמה.",
      contactTitle: "יצירת קשר",
      contactIntro: "לתמיכה או שאלות הקשורות לפרטיות:",
      footerPrivacy: "מדיניות פרטיות",
      footerTerms: "תנאי שירות",
      footerDataDeletion: "מדיניות מחיקת נתונים",
    },
  };

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

  /**
   * @param {string} locale
   * @returns {Record<string, string>}
   */
  function getHomeCopy(locale) {
    var normalized = normalizeLocale(locale);
    return HOME_COPY[normalized] || HOME_COPY[DEFAULT_LOCALE];
  }

  global.StayOrPayI18n = {
    SUPPORTED_LOCALES: SUPPORTED_LOCALES,
    RTL_LOCALES: RTL_LOCALES,
    DEFAULT_LOCALE: DEFAULT_LOCALE,
    SITE_URL: SITE_URL,
    HOME_COPY: HOME_COPY,
    normalizeLocale: normalizeLocale,
    detectBrowserLocale: detectBrowserLocale,
    directionForLocale: directionForLocale,
    buildDocPath: buildDocPath,
    buildLocalizedDocPath: buildLocalizedDocPath,
    getHomeCopy: getHomeCopy,
  };
})(window);
