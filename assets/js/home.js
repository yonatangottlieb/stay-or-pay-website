(function () {
  "use strict";

  var i18n = window.StayOrPayI18n;
  if (!i18n) {
    return;
  }

  document.querySelectorAll("[data-doc-link]").forEach(function (anchor) {
    var docSlug = anchor.getAttribute("data-doc-link");
    if (!docSlug) {
      return;
    }

    anchor.setAttribute("href", i18n.buildLocalizedDocPath(docSlug));
  });
})();
