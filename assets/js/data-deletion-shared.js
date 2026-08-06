(function (global) {
  "use strict";

  var CALLBACK_URL = "https://stayorpay.app/oauth/callback/";
  var DELETE_CONFIRM_KEYWORD = "DELETE";

  var TRANSLATIONS = {
    en: {
      "page.title": "Delete your account — STAY OR PAY",
      "page.eyebrow": "Account deletion",
      "signedOut.title": "Delete your Stay or Pay account",
      "signedOut.lead":
        "Sign in with the same Google or Apple account you use in the app. After signing in, you can permanently delete your account and personal data.",
      "signedOut.sameAccount":
        "Use the same account you signed into in the mobile app.",
      "signedOut.privacy": "Privacy Policy",
      "auth.google": "Continue with Google",
      "auth.apple": "Continue with Apple",
      "auth.signingIn": "Signing in…",
      "signedIn.title": "Signed in",
      "signedIn.lead": "Review the details below, then delete your account if you are sure.",
      "signedIn.name": "Name",
      "signedIn.email": "Email",
      "signedIn.dataTitle": "What will be deleted",
      "signedIn.dataBody":
        "Your profile, display name, phone number, email, session history, partner connections, pending invites, payment setup data, and authentication record.",
      "delete.button": "Delete account",
      "delete.confirmTitle": "Delete your account permanently?",
      "delete.confirmBody":
        "This cannot be undone. Type DELETE to confirm.",
      "delete.confirmPlaceholder": "Type DELETE",
      "delete.confirmAction": "Delete my account",
      "delete.cancel": "Cancel",
      "delete.inProgress": "Deleting account…",
      "success.title": "Account deleted",
      "success.body":
        "Your account and personal data have been removed. You will be redirected shortly.",
      "success.home": "Back to home",
      "error.config":
        "Account deletion is temporarily unavailable. Please try again later or contact support@stayorpay.app.",
      "error.sessionExpired": "Your session expired. Sign in again.",
      "error.network": "Network error. Check your connection and try again.",
      "error.failed": "Could not delete your account. Please try again.",
      "error.protected": "This account cannot be deleted from this page.",
      "error.notAuthenticated": "Sign in to delete your account.",
      "error.retry": "Try again",
    },
    he: {
      "page.title": "מחיקת חשבון — STAY OR PAY",
      "page.eyebrow": "מחיקת חשבון",
      "signedOut.title": "מחיקת חשבון Stay or Pay",
      "signedOut.lead":
        "התחבר/י עם אותו חשבון Google או Apple שבו את/ה משתמש/ת באפליקציה. לאחר ההתחברות תוכל/י למחוק לצמיתות את החשבון והנתונים האישיים.",
      "signedOut.sameAccount":
        "יש להתחבר עם אותו חשבון שבו נכנסת לאפליקציה.",
      "signedOut.privacy": "מדיניות פרטיות",
      "auth.google": "המשך/י עם Google",
      "auth.apple": "המשך/י עם Apple",
      "auth.signingIn": "מתחבר…",
      "signedIn.title": "מחובר/ת",
      "signedIn.lead": "בדוק/י את הפרטים למטה, ואז מחק/י את החשבון אם את/ה בטוח/ה.",
      "signedIn.name": "שם",
      "signedIn.email": "אימייל",
      "signedIn.dataTitle": "מה יימחק",
      "signedIn.dataBody":
        "הפרופיל, שם התצוגה, מספר הטלפון, האימייל, היסטוריית הסשנים, חיבורי הפרטנרים, הזמנות ממתינות, נתוני הגדרת תשלום ורשומת ההתחברות.",
      "delete.button": "מחיקת החשבון",
      "delete.confirmTitle": "למחוק את החשבון לצמיתות?",
      "delete.confirmBody": "לא ניתן לבטל. הקלד/י DELETE לאישור.",
      "delete.confirmPlaceholder": "הקלד/י DELETE",
      "delete.confirmAction": "מחק/י את החשבון שלי",
      "delete.cancel": "ביטול",
      "delete.inProgress": "מוחק חשבון…",
      "success.title": "החשבון נמחק",
      "success.body":
        "החשבון והנתונים האישיים שלך הוסרו. תועבר/י לדף הבית בקרוב.",
      "success.home": "חזרה לדף הבית",
      "error.config":
        "מחיקת החשבון אינה זמינה כרגע. נסה/י שוב מאוחר יותר או פנה/י ל־support@stayorpay.app.",
      "error.sessionExpired": "פג תוקף ההתחברות. התחבר/י מחדש.",
      "error.network": "שגיאת רשת. בדוק/י את החיבור ונסה/י שוב.",
      "error.failed": "לא ניתן למחוק את החשבון. נסה/י שוב.",
      "error.protected": "לא ניתן למחוק חשבון זה מעמוד זה.",
      "error.notAuthenticated": "יש להתחבר כדי למחוק את החשבון.",
      "error.retry": "נסה/י שוב",
    },
  };

  function normalizeLocale(value) {
    return value === "he" ? "he" : "en";
  }

  function resolveLocale() {
    var params = new URLSearchParams(global.location.search);
    var fromQuery = params.get("lang");
    if (fromQuery) {
      return normalizeLocale(fromQuery);
    }
    if (global.StayOrPayI18n) {
      return global.StayOrPayI18n.normalizeLocale(
        global.localStorage.getItem("stayorpay.locale") ||
          global.StayOrPayI18n.detectBrowserLocale()
      );
    }
    return "en";
  }

  function t(locale, key) {
    var strings = TRANSLATIONS[locale] || TRANSLATIONS.en;
    return strings[key] || TRANSLATIONS.en[key] || key;
  }

  function applyLocale(locale) {
    var normalized = normalizeLocale(locale);
    var root = document.documentElement;
    root.lang = normalized;
    root.dir = normalized === "he" ? "rtl" : "ltr";
    document.title = t(normalized, "page.title");

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.getAttribute("data-i18n");
      if (key) {
        element.textContent = t(normalized, key);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-placeholder");
      if (key) {
        element.setAttribute("placeholder", t(normalized, key));
      }
    });

    var privacyLink = document.getElementById("privacy-link");
    if (privacyLink && global.StayOrPayI18n) {
      privacyLink.setAttribute(
        "href",
        global.StayOrPayI18n.buildDocPath("privacy", normalized)
      );
    }

    global.localStorage.setItem("stayorpay.locale", normalized);
    return normalized;
  }

  function displayNameFromUser(user) {
    var metadata = user.user_metadata || {};
    return (
      metadata.full_name ||
      metadata.name ||
      metadata.display_name ||
      user.email ||
      "—"
    );
  }

  function canConfirmDelete(value) {
    return String(value || "").trim().toUpperCase() === DELETE_CONFIRM_KEYWORD;
  }

  function mapDeleteError(status, payload) {
    if (status === 401) return "error.sessionExpired";
    if (status === 403) return "error.protected";
    if (payload && payload.error === "account_protected") return "error.protected";
    return "error.failed";
  }

  global.StayOrPayDataDeletion = {
    CALLBACK_URL: CALLBACK_URL,
    DELETE_CONFIRM_KEYWORD: DELETE_CONFIRM_KEYWORD,
    TRANSLATIONS: TRANSLATIONS,
    normalizeLocale: normalizeLocale,
    resolveLocale: resolveLocale,
    applyLocale: applyLocale,
    t: t,
    displayNameFromUser: displayNameFromUser,
    canConfirmDelete: canConfirmDelete,
    mapDeleteError: mapDeleteError,
  };
})(window);
