(function () {
  "use strict";

  var i18n = window.StayOrPayI18n;
  if (!i18n) {
    return;
  }

  var LOCALE_STORAGE_KEY = "stayorpay.locale";
  var UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  /** @type {Record<string, Record<string, string>>} */
  var TRANSLATIONS = {
    en: {
      "meta.title": "Stay or Pay — Partner invite",
      "meta.description":
        "You received a partner invite for Stay or Pay. Open the app or copy the invite code.",
      "invite.eyebrow": "Partner invite",
      "invite.title": "You were invited to Stay or Pay",
      "invite.lead":
        "Open the app to review the invite and choose whether to connect.",
      "invite.codeLabel": "Invite code",
      "invite.openApp": "Open in app",
      "invite.copyCode": "Copy code",
      "invite.playStore": "Get it on Google Play",
      "invite.playStoreNote": "Coming soon on Google Play",
      "invite.copied": "Invite code copied.",
      "invite.errorTitle": "Invite link problem",
      "invite.errorMissing": "This invite link is missing a code.",
      "invite.errorInvalid": "This invite code is not valid.",
      "invite.backHome": "Back to home",
    },
    he: {
      "meta.title": "Stay or Pay — הזמנת פרטנר",
      "meta.description":
        "קיבלת הזמנה להתחבר ב־Stay or Pay. פתח/י את האפליקציה או העתק/י את קוד ההזמנה.",
      "invite.eyebrow": "הזמנת פרטנר",
      "invite.title": "הוזמנת ל־Stay or Pay",
      "invite.lead":
        "פתח/י את האפליקציה כדי לראות את ההזמנה ולבחור אם להתחבר.",
      "invite.codeLabel": "קוד הזמנה",
      "invite.openApp": "פתח באפליקציה",
      "invite.copyCode": "העתק קוד",
      "invite.playStore": "הורד מ־Google Play",
      "invite.playStoreNote": "בקרוב ב־Google Play",
      "invite.copied": "קוד ההזמנה הועתק.",
      "invite.errorTitle": "בעיה בקישור ההזמנה",
      "invite.errorMissing": "בקישור הזה חסר קוד הזמנה.",
      "invite.errorInvalid": "קוד ההזמנה אינו תקין.",
      "invite.backHome": "חזרה לדף הבית",
    },
  };

  /**
   * @param {string} locale
   * @returns {string}
   */
  function resolveLocale(locale) {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("lang");
    if (requested) {
      return i18n.normalizeLocale(requested);
    }

    try {
      var stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored) {
        return i18n.normalizeLocale(stored);
      }
    } catch (error) {
      /* ignore */
    }

    return i18n.detectBrowserLocale();
  }

  /**
   * @param {string} locale
   */
  function applyLocale(locale) {
    var normalized = i18n.normalizeLocale(locale);
    var strings = TRANSLATIONS[normalized] || TRANSLATIONS.en;
    document.documentElement.lang = normalized;
    document.documentElement.dir = i18n.directionForLocale(normalized);

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (!key || !strings[key]) {
        return;
      }
      node.textContent = strings[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      var key = node.getAttribute("data-i18n-placeholder");
      if (!key || !strings[key]) {
        return;
      }
      node.setAttribute("placeholder", strings[key]);
    });

    if (strings["meta.title"]) {
      document.title = strings["meta.title"];
    }

    var description = document.querySelector('meta[name="description"]');
    if (description && strings["meta.description"]) {
      description.setAttribute("content", strings["meta.description"]);
    }
  }

  /**
   * @returns {string}
   */
  function extractInviteCode() {
    var params = new URLSearchParams(window.location.search);
    var fromQuery = params.get("code");
    if (fromQuery && UUID_PATTERN.test(fromQuery.trim())) {
      return fromQuery.trim().toLowerCase();
    }

    var segments = window.location.pathname.split("/").filter(Boolean);
    var inviteIndex = segments.indexOf("invite");
    if (inviteIndex !== -1 && segments.length > inviteIndex + 1) {
      var fromPath = segments[inviteIndex + 1];
      if (UUID_PATTERN.test(fromPath)) {
        return fromPath.toLowerCase();
      }
    }

    return "";
  }

  /**
   * @param {string} code
   * @returns {string}
   */
  function buildAppDeepLink(code) {
    return "stayorpay://invite?code=" + encodeURIComponent(code);
  }

  /**
   * @param {string} code
   * @returns {string}
   */
  function buildHttpsInviteLink(code) {
    return (
      "https://stayorpay.app/invite/?code=" + encodeURIComponent(code)
    );
  }

  function showError(messageKey) {
    var errorPanel = document.getElementById("invite-error");
    var contentPanel = document.getElementById("invite-content");
    var messageNode = document.getElementById("invite-error-message");
    var locale = resolveLocale();
    var strings = TRANSLATIONS[locale] || TRANSLATIONS.en;

    if (contentPanel) {
      contentPanel.hidden = true;
    }
    if (errorPanel) {
      errorPanel.hidden = false;
    }
    if (messageNode && strings[messageKey]) {
      messageNode.textContent = strings[messageKey];
    }
  }

  function initInvitePage() {
    var locale = resolveLocale();
    applyLocale(locale);

    var code = extractInviteCode();
    var codeNode = document.getElementById("invite-code-value");
    var openAppButton = document.getElementById("invite-open-app");
    var copyButton = document.getElementById("invite-copy-code");

    if (!code) {
      showError("invite.errorMissing");
      return;
    }

    if (!UUID_PATTERN.test(code)) {
      showError("invite.errorInvalid");
      return;
    }

    if (codeNode) {
      codeNode.textContent = code;
    }

    if (openAppButton) {
      openAppButton.href = buildAppDeepLink(code);
      openAppButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = buildAppDeepLink(code);
        window.setTimeout(function () {
          window.location.href = buildHttpsInviteLink(code);
        }, 1200);
      });
    }

    if (copyButton) {
      copyButton.addEventListener("click", function () {
        var strings = TRANSLATIONS[locale] || TRANSLATIONS.en;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(function () {
            copyButton.textContent = strings["invite.copied"];
          });
          return;
        }

        var textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        copyButton.textContent = strings["invite.copied"];
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvitePage);
  } else {
    initInvitePage();
  }
})();
