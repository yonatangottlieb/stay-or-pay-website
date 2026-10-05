/**
 * Wires Google Play / iOS CTAs from StayOrPayAppStore config.
 * No automatic redirects — user must tap a control.
 */
(function () {
  "use strict";

  var store = window.StayOrPayAppStore;
  if (!store) {
    return;
  }

  var STRINGS = {
    en: {
      download: "Download from Google Play",
      downloadShort: "Download",
      androidBannerTitle: "Stay or Pay is available on Google Play",
      androidBannerAction: "Download",
      comingSoonNote: "Google Play listing coming soon",
      closedTestingNote:
        "Stay or Pay is currently in limited Google Play testing. Testers can install from Play. If you are not a tester, you can still open the app if it is already installed.",
      iosNote: "iPhone version coming soon",
    },
    he: {
      download: "הורדה מ־Google Play",
      downloadShort: "להורדה",
      androidBannerTitle: "Stay or Pay זמינה ב־Google Play",
      androidBannerAction: "להורדה",
      comingSoonNote: "עמוד Google Play יעלה בקרוב",
      closedTestingNote:
        "Stay or Pay כרגע בגישה מוגבלת ב־Google Play. אם הוזמנת כבודק אפשר להתקין. אם לא, אפשר לפתוח את האפליקציה אם היא כבר מותקנת.",
      iosNote: "גרסת iPhone בקרוב",
    },
    fr: {
      download: "Télécharger sur Google Play",
      downloadShort: "Télécharger",
      androidBannerTitle: "Stay or Pay est disponible sur Google Play",
      androidBannerAction: "Télécharger",
      comingSoonNote: "Fiche Google Play bientôt disponible",
      closedTestingNote:
        "Stay or Pay est actuellement en test limité sur Google Play. Les testeurs peuvent installer. Sinon, ouvrez l’app si elle est déjà installée.",
      iosNote: "Version iPhone bientôt disponible",
    },
  };

  function currentLocale() {
    var lang = (document.documentElement.lang || "en").toLowerCase();
    if (lang.indexOf("he") === 0) {
      return "he";
    }
    if (lang.indexOf("fr") === 0) {
      return "fr";
    }
    return "en";
  }

  function t(key) {
    var locale = currentLocale();
    return (STRINGS[locale] && STRINGS[locale][key]) || STRINGS.en[key] || key;
  }

  function resolvePlayStoreUrl() {
    if (!store.isPlayStoreAvailable()) {
      return null;
    }

    var inviteLinks = window.StayOrPayInviteLinks;
    var inviteCode = document.documentElement.getAttribute("data-invite-code");
    if (
      inviteLinks &&
      inviteCode &&
      inviteLinks.isValidInviteCode &&
      inviteLinks.isValidInviteCode(inviteCode) &&
      inviteLinks.buildPlayStoreListingUrl
    ) {
      return inviteLinks.buildPlayStoreListingUrl(inviteCode);
    }

    return store.getPlayStoreUrl();
  }

  function setPlayStoreControl(element) {
    if (!element) {
      return;
    }

    var available = store.isPlayStoreAvailable();
    var url = resolvePlayStoreUrl();
    var labelKey = element.getAttribute("data-play-label") || "download";
    var label = t(labelKey);

    element.textContent = label;
    element.setAttribute("aria-label", label);

    if (element.tagName === "A") {
      if (available && url) {
        element.href = url;
        element.setAttribute("rel", "noopener noreferrer");
        element.setAttribute("target", "_blank");
        element.removeAttribute("aria-disabled");
        element.removeAttribute("tabindex");
        element.classList.remove("is-disabled");
        element.onclick = null;
      } else {
        element.href = "#";
        element.setAttribute("aria-disabled", "true");
        element.setAttribute("tabindex", "-1");
        element.classList.add("is-disabled");
        element.onclick = function (event) {
          event.preventDefault();
        };
      }
    } else if (element.tagName === "BUTTON") {
      element.disabled = !available;
      element.classList.toggle("is-disabled", !available);
      element.onclick = function () {
        if (!available || !url) {
          return;
        }
        window.open(url, "_blank", "noopener,noreferrer");
      };
    }
  }

  function syncNotes() {
    var available = store.isPlayStoreAvailable();
    var closedTesting =
      typeof store.isClosedTesting === "function" && store.isClosedTesting();
    document.querySelectorAll("[data-play-store-note]").forEach(function (node) {
      var mode = node.getAttribute("data-play-store-note");
      if (mode === "coming-soon") {
        node.hidden = available;
        if (!available) {
          node.textContent = t("comingSoonNote");
        }
      }
      if (mode === "closed-testing") {
        node.hidden = !closedTesting;
        if (closedTesting) {
          node.textContent = t("closedTestingNote");
        }
      }
    });
  }

  function syncIosNote() {
    var platform = store.detectPlatform();
    document.querySelectorAll("[data-ios-coming-soon]").forEach(function (node) {
      if (platform === "ios") {
        node.hidden = false;
        node.textContent = t("iosNote");
      } else {
        node.hidden = true;
      }
    });
  }

  function syncPlatformVisibility() {
    var platform = store.detectPlatform();
    document.documentElement.setAttribute("data-platform", platform);

    document.querySelectorAll("[data-platform-visible]").forEach(function (node) {
      var allowed = (node.getAttribute("data-platform-visible") || "")
        .split(",")
        .map(function (part) {
          return part.trim();
        })
        .filter(Boolean);
      var visible = allowed.indexOf(platform) !== -1;
      node.hidden = !visible;
    });

    document.querySelectorAll("[data-platform-hidden]").forEach(function (node) {
      var blocked = (node.getAttribute("data-platform-hidden") || "")
        .split(",")
        .map(function (part) {
          return part.trim();
        })
        .filter(Boolean);
      node.hidden = blocked.indexOf(platform) !== -1;
    });
  }

  function syncAndroidBanner() {
    var banner = document.getElementById("android-play-banner");
    if (!banner) {
      return;
    }

    var platform = store.detectPlatform();
    if (platform !== "android") {
      banner.hidden = true;
      return;
    }

    banner.hidden = false;
    var title = banner.querySelector("[data-android-banner-title]");
    var action = banner.querySelector("[data-play-store-cta]");
    if (title) {
      title.textContent = t("androidBannerTitle");
    }
    if (action) {
      action.setAttribute("data-play-label", "androidBannerAction");
      setPlayStoreControl(action);
    }
  }

  function applyAll() {
    syncPlatformVisibility();
    document.querySelectorAll("[data-play-store-cta]").forEach(setPlayStoreControl);
    syncNotes();
    syncIosNote();
    syncAndroidBanner();
  }

  window.applyAll = applyAll;
  window.StayOrPayPlayStoreCta = {
    applyAll: applyAll,
    t: t,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAll);
  } else {
    applyAll();
  }
})();
