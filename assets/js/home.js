(function () {
  "use strict";

  var i18n = window.StayOrPayI18n;
  if (!i18n) {
    return;
  }

  var LOCALE_STORAGE_KEY = "stayorpay.locale";

  /** @type {Record<string, Record<string, string>>} */
  var TRANSLATIONS = {
    en: {
      "nav.about": "About",
      "nav.howItWorks": "How it works",
      "nav.contact": "Contact",
      "nav.privacy": "Privacy",
      "nav.terms": "Terms",
      "hero.eyebrow": "A real commitment to focus",
      "hero.headline": "Stay focused.<br />Or pay.",
      "hero.subheadline":
        "STAY OR PAY turns your focus sessions into real commitments.<br />Set a timer, stay until it ends, and keep your word.",
      "hero.ctaPrimary": "Coming soon on Google Play",
      "hero.ctaSecondary": "See how it works",
      "mockup.homeCaption": "STAY OR PAY home screen",
      "mockup.tagline": "Stay focused. Or pay the price.",
      "mockup.stepTime": "Choose time",
      "mockup.continue": "Continue",
      "mockup.focusLabel": "Focus session",
      "mockup.commitment": "Finish my study session",
      "mockup.completeTitle": "Session complete",
      "mockup.completeSub": "Life reclaimed",
      "how.title": "How it works",
      "how.step1.title": "Set your commitment",
      "how.step1.text": "Choose how long you want to stay focused.",
      "how.step2.title": "Start the session",
      "how.step2.text": "Your timer begins and your commitment becomes real.",
      "how.step3.title": "Stay or pay",
      "how.step3.text":
        "Finish the session and keep your commitment. Leave early, and the consequence applies.",
      "why.title": "Why STAY OR PAY works",
      "why.item1.title": "Real accountability",
      "why.item1.text": "Your commitment has a real consequence.",
      "why.item2.title": "Simple by design",
      "why.item2.text": "No complicated systems. Just choose, start, and stay.",
      "why.item3.title": "Built for deep focus",
      "why.item3.text": "Designed for studying, working, creating, exercising, and building.",
      "why.item4.title": "Practice without risk",
      "why.item4.text": "You can also use Practice mode without putting money at risk.",
      "focus.line1": "Your goals matter.",
      "focus.line2": "Your time matters.",
      "focus.line3": "Keep your commitment.",
      "cta.title": "Ready to stay focused?",
      "cta.text": "STAY OR PAY is coming soon to Google Play.",
      "cta.button": "Coming soon on Google Play",
      "contact.title": "Contact",
      "contact.lead": "For support or privacy-related questions:",
      "footer.rights": "All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.dataDeletion": "Data Deletion Policy",
      "footer.deleteAccount": "Delete Account and Data",
      "meta.title": "STAY OR PAY — Stay focused. Or pay.",
      "meta.description":
        "STAY OR PAY turns your focus sessions into real commitments. Set a timer, stay until it ends, and keep your word. Coming soon to Google Play.",
      "aria.ctaPrimary": "Coming soon on Google Play",
    },
    he: {
      "nav.about": "אודות",
      "nav.howItWorks": "איך זה עובד",
      "nav.contact": "יצירת קשר",
      "nav.privacy": "פרטיות",
      "nav.terms": "תנאים",
      "hero.eyebrow": "מחויבות אמיתית לפוקוס",
      "hero.headline": "נשארים בפוקוס.<br />או משלמים.",
      "hero.subheadline":
        "STAY OR PAY הופכת כל סשן פוקוס להתחייבות אמיתית.<br />מגדירים זמן, נשארים עד הסוף ועומדים במילה שלכם.",
      "hero.ctaPrimary": "בקרוב ב־Google Play",
      "hero.ctaSecondary": "איך זה עובד",
      "mockup.homeCaption": "מסך הבית של STAY OR PAY",
      "mockup.tagline": "Stay focused. Or pay the price.",
      "mockup.stepTime": "בחירת זמן",
      "mockup.continue": "המשך",
      "mockup.focusLabel": "סשן פוקוס",
      "mockup.commitment": "לסיים את סשן הלימוד",
      "mockup.completeTitle": "הסשן הושלם",
      "mockup.completeSub": "זמן שנחזר",
      "how.title": "איך זה עובד",
      "how.step1.title": "מגדירים התחייבות",
      "how.step1.text": "בוחרים כמה זמן רוצים להישאר בפוקוס.",
      "how.step2.title": "מתחילים את הסשן",
      "how.step2.text": "הטיימר מתחיל וההתחייבות הופכת לאמיתית.",
      "how.step3.title": "נשארים או משלמים",
      "how.step3.text": "מסיימים את הסשן ושומרים על ההתחייבות. עוזבים מוקדם, וההשלכה מופעלת.",
      "why.title": "למה STAY OR PAY עובדת",
      "why.item1.title": "אחריות אמיתית",
      "why.item1.text": "להתחייבות שלכם יש השלכה אמיתית.",
      "why.item2.title": "פשוטה בכוונה",
      "why.item2.text": "בלי מערכות מסובכות. בוחרים, מתחילים ונשארים.",
      "why.item3.title": "בנויה לפוקוס עמוק",
      "why.item3.text": "מתאימה ללימודים, עבודה, יצירה, אימונים ובנייה של דברים גדולים.",
      "why.item4.title": "אפשר להתאמן בלי סיכון",
      "why.item4.text": "אפשר להשתמש גם במצב תרגול בלי לסכן כסף.",
      "focus.line1": "המטרות שלכם חשובות.",
      "focus.line2": "הזמן שלכם חשוב.",
      "focus.line3": "עמדו בהתחייבות שלכם.",
      "cta.title": "מוכנים להישאר בפוקוס?",
      "cta.text": "STAY OR PAY מגיעה בקרוב ל־Google Play.",
      "cta.button": "בקרוב ב־Google Play",
      "contact.title": "יצירת קשר",
      "contact.lead": "לתמיכה או לשאלות בנושא פרטיות:",
      "footer.rights": "כל הזכויות שמורות.",
      "footer.privacy": "מדיניות פרטיות",
      "footer.terms": "תנאי שימוש",
      "footer.dataDeletion": "מדיניות מחיקת נתונים",
      "footer.deleteAccount": "מחיקת חשבון ונתונים",
      "meta.title": "STAY OR PAY — נשארים בפוקוס. או משלמים.",
      "meta.description":
        "STAY OR PAY הופכת כל סשן פוקוס להתחייבות אמיתית. מגדירים זמן, נשארים עד הסוף ועומדים במילה שלכם. בקרוב ב־Google Play.",
      "aria.ctaPrimary": "בקרוב ב־Google Play",
    },
  };

  /**
   * @returns {string}
   */
  function resolveInitialLocale() {
    var params = new URLSearchParams(window.location.search);
    var queryLocale = params.get("lang");
    if (queryLocale) {
      return i18n.normalizeLocale(queryLocale);
    }

    try {
      var stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored) {
        return i18n.normalizeLocale(stored);
      }
    } catch (_error) {
      /* ignore storage errors */
    }

    return i18n.detectBrowserLocale();
  }

  /**
   * @param {string} locale
   */
  function applyLocale(locale) {
    var normalized = i18n.normalizeLocale(locale);
    var strings = TRANSLATIONS[normalized] || TRANSLATIONS.en;
    var root = document.documentElement;

    root.lang = normalized;
    root.dir = i18n.directionForLocale(normalized);

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.getAttribute("data-i18n");
      if (!key || strings[key] === undefined) {
        return;
      }
      element.textContent = strings[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-html");
      if (!key || strings[key] === undefined) {
        return;
      }
      element.innerHTML = strings[key];
    });

    document.querySelectorAll('[role="status"].btn-primary').forEach(function (element) {
      element.setAttribute("aria-label", strings["aria.ctaPrimary"]);
    });

    document.title = strings["meta.title"];

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", strings["meta.description"]);
    }

    document.querySelectorAll("[data-set-locale]").forEach(function (button) {
      var buttonLocale = button.getAttribute("data-set-locale");
      var isActive = buttonLocale === normalized;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    document.querySelectorAll("[data-doc-link]").forEach(function (anchor) {
      var docSlug = anchor.getAttribute("data-doc-link");
      if (!docSlug) {
        return;
      }
      anchor.setAttribute("href", i18n.buildDocPath(docSlug, normalized));
    });

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, normalized);
    } catch (_error) {
      /* ignore storage errors */
    }
  }

  var activeLocale = resolveInitialLocale();
  applyLocale(activeLocale);

  document.querySelectorAll("[data-set-locale]").forEach(function (button) {
    button.addEventListener("click", function () {
      var locale = button.getAttribute("data-set-locale");
      if (!locale) {
        return;
      }
      applyLocale(locale);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      var target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (target.id) {
        history.replaceState(null, "", targetId);
      }
    });
  });
})();
