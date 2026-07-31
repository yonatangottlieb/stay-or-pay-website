(function () {
  "use strict";

  var root = document.documentElement;
  var pageLocale = root.getAttribute("lang") || "en";
  var docSlug = root.getAttribute("data-doc-slug");

  if (!docSlug || !window.StayOrPayI18n) {
    return;
  }

  var i18n = window.StayOrPayI18n;

  document.querySelectorAll("[data-locale-link]").forEach(function (anchor) {
    var locale = anchor.getAttribute("data-locale-link");
    if (!locale) {
      return;
    }

    anchor.setAttribute("href", i18n.buildDocPath(docSlug, locale));

    if (locale === pageLocale) {
      anchor.classList.add("is-active");
      anchor.setAttribute("aria-current", "page");
    }
  });
})();
