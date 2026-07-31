(function () {
  "use strict";

  var i18n = window.StayOrPayI18n;
  if (!i18n) {
    return;
  }

  var locale = i18n.detectBrowserLocale();
  var copy = i18n.getHomeCopy(locale);
  var root = document.documentElement;

  root.setAttribute("lang", locale);
  root.setAttribute("dir", i18n.directionForLocale(locale));

  document.title = copy.pageTitle;

  setMetaContent("description", copy.metaDescription);
  setMetaContent("keywords", copy.metaKeywords);
  setMetaProperty("og:title", copy.pageTitle);
  setMetaProperty("og:description", copy.metaDescription);
  setMetaProperty("og:locale", copy.ogLocale);
  setMetaName("twitter:title", copy.pageTitle);
  setMetaName("twitter:description", copy.metaDescription);

  setText("[data-i18n='hero-headline']", copy.heroHeadline);
  setText("[data-i18n='hero-paragraph']", copy.heroParagraph);
  setText("[data-i18n='cta-label']", copy.ctaLabel);
  setText("[data-i18n='about-title']", copy.aboutTitle);
  setText("[data-i18n='about-p1']", copy.aboutParagraph1);
  setText("[data-i18n='about-p2']", copy.aboutParagraph2);
  setText("[data-i18n='contact-title']", copy.contactTitle);
  setText("[data-i18n='contact-intro']", copy.contactIntro);
  setText("[data-i18n='footer-privacy']", copy.footerPrivacy);
  setText("[data-i18n='footer-terms']", copy.footerTerms);
  setText("[data-i18n='footer-data-deletion']", copy.footerDataDeletion);

  document.querySelectorAll("[data-doc-link]").forEach(function (anchor) {
    var docSlug = anchor.getAttribute("data-doc-link");
    if (!docSlug) {
      return;
    }

    anchor.setAttribute("href", i18n.buildDocPath(docSlug, locale));
  });

  /**
   * @param {string} selector
   * @param {string} value
   */
  function setText(selector, value) {
    var node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  }

  /**
   * @param {string} name
   * @param {string} value
   */
  function setMetaContent(name, value) {
    var node = document.querySelector('meta[name="' + name + '"]');
    if (node) {
      node.setAttribute("content", value);
    }
  }

  /**
   * @param {string} property
   * @param {string} value
   */
  function setMetaProperty(property, value) {
    var node = document.querySelector('meta[property="' + property + '"]');
    if (node) {
      node.setAttribute("content", value);
    }
  }

  /**
   * @param {string} name
   * @param {string} value
   */
  function setMetaName(name, value) {
    var node = document.querySelector('meta[name="' + name + '"]');
    if (node) {
      node.setAttribute("content", value);
    }
  }
})();
