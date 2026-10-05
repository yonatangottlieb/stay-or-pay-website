(function () {
  "use strict";

  var i18n = window.StayOrPayI18n;
  if (!i18n) {
    return;
  }

  var LOCALE_STORAGE_KEY = "stayorpay.locale";

  /* Product names are bound with non-breaking spaces: they must never
     split across lines, least of all inside a right-to-left sentence. */
  var SOP = "Stay\u00a0or\u00a0Pay";
  var PLAY = "Google\u00a0Play";

  /** @type {Record<string, Record<string, string>>} */
  var TRANSLATIONS = {
    en: {
      skip: "Skip to content",
      "brand.home": SOP + " home",
      "nav.about": "About",
      "nav.howItWorks": "How it works",
      "nav.contact": "Contact",
      "nav.privacy": "Privacy",
      "nav.terms": "Terms",
      "nav.menu": "Menu",
      "nav.close": "Close menu",
      "hero.headline":
        "<span class=\"tline tline--hold\">Stay focused.</span> <span class=\"tline tline--stake\">Or pay.</span>",
      "hero.subheadline": "Set a timer, stay until it ends,<br>and keep your word.",
      "hero.ctaPrimary": "Download from " + PLAY,
      "hero.ctaSecondary": "See how it works",
      "hero.playNote": PLAY + " listing coming soon",
      "hero.iosNote": "iPhone version coming soon",
      "time.25": "25 min",
      "time.45": "45 min",
      "time.60": "1 hr",
      "time.25.long": "25 minutes",
      "time.45.long": "45 minutes",
      "time.60.long": "1 hour",
      "time.unit": "min",
      "androidBanner.title": SOP + " is available on " + PLAY,
      "androidBanner.action": "Download",
      "mockup.heroCaption": SOP + " focus session",
      "mockup.homeCaption": SOP + " home screen",
      "mockup.tagline": "Stay focused. Or pay the price.",
      "mockup.stepTime": "Choose time",
      "mockup.continue": "Continue",
      "mockup.focusLabel": "Focus session",
      "mockup.commitment": "Finish my study session",
      "mockup.completeTitle": "Session complete",
      "mockup.completeSub": "Life reclaimed",
      "how.kicker": "Before the session",
      "how.title": "How it works",
      "how.step1.title": "Choose your time",
      "how.step1.text": "Choose how long you want to stay focused.",
      "how.step2.title": "Give your word",
      "how.step2.text":
        "Choose the person you are giving your word to. They get an invite and decide whether to connect.",
      "how.step3.title": "Name the commitment",
      "how.step3.text": "Write what you are going to do in that time.",
      "session.kicker": "The session",
      "session.title": "Start the session",
      "session.text": "Your timer begins and your commitment becomes real.",
      "session.hint": "Then you put the phone down.",
      "outcome.title":
        "<span class=\"tline tline--hold\">Stay.</span> <span class=\"tline tline--stake\">Or pay.</span>",
      "outcome.text":
        "Finish the session and keep your commitment. Leave early, and the consequence applies.",
      "why.kicker": "About",
      "why.title": "Why " + SOP + " works",
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
      "cta.text":
        "Download " + SOP + " from " + PLAY + " and turn focus into a real commitment.",
      "cta.button": "Download from " + PLAY,
      "cta.playNote": PLAY + " listing coming soon",
      "cta.iosNote": "iPhone version coming soon",
      "contact.title": "Contact",
      "contact.lead": "For support or privacy-related questions:",
      "footer.rights": "All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.dataDeletion": "Data Deletion Policy",
      "footer.deleteAccount": "Delete Account and Data",
      "meta.title": "Stay or Pay — Stay focused. Or pay.",
      "meta.description":
        "Stay or Pay turns your focus sessions into real commitments. Set a timer, stay until it ends, and keep your word. Download from Google Play.",
      "aria.ctaPrimary": "Download from " + PLAY,
    },
    he: {
      skip: "דלג לתוכן",
      "brand.home": SOP + " — דף הבית",
      "nav.about": "אודות",
      "nav.howItWorks": "איך זה עובד",
      "nav.contact": "יצירת קשר",
      "nav.privacy": "פרטיות",
      "nav.terms": "תנאים",
      "nav.menu": "תפריט",
      "nav.close": "סגירת תפריט",
      "hero.headline":
        "<span class=\"tline tline--hold\">נשארים בפוקוס.</span> <span class=\"tline tline--stake\">או משלמים.</span>",
      "hero.subheadline": "מגדירים זמן, נשארים עד הסוף<br>ועומדים במילה שלכם.",
      "hero.ctaPrimary": "הורדה מ־" + PLAY,
      "hero.ctaSecondary": "איך זה עובד",
      "hero.playNote": "עמוד " + PLAY + " יעלה בקרוב",
      "hero.iosNote": "גרסת iPhone בקרוב",
      "time.25": "25 דק׳",
      "time.45": "45 דק׳",
      "time.60": "שעה",
      "time.25.long": "25 דקות",
      "time.45.long": "45 דקות",
      "time.60.long": "שעה אחת",
      "time.unit": "דק׳",
      "androidBanner.title": SOP + " זמינה ב־" + PLAY,
      "androidBanner.action": "להורדה",
      "mockup.heroCaption": "סשן פוקוס ב־" + SOP,
      "mockup.homeCaption": "מסך הבית של " + SOP,
      "mockup.tagline": "Stay focused. Or pay the price.",
      "mockup.stepTime": "בחירת זמן",
      "mockup.continue": "המשך",
      "mockup.focusLabel": "סשן פוקוס",
      "mockup.commitment": "לסיים את סשן הלימוד",
      "mockup.completeTitle": "הסשן הושלם",
      "mockup.completeSub": "זמן שנחזר",
      "how.kicker": "לפני שמתחילים",
      "how.title": "איך זה עובד",
      "how.step1.title": "בוחרים זמן",
      "how.step1.text": "בוחרים כמה זמן רוצים להישאר בפוקוס.",
      "how.step2.title": "נותנים מילה",
      "how.step2.text":
        "בוחרים למי נותנים את המילה. נשלחת הזמנה, והצד השני מחליט אם להתחבר.",
      "how.step3.title": "מנסחים את ההתחייבות",
      "how.step3.text": "כותבים מה הולכים לעשות בזמן הזה.",
      "session.kicker": "הסשן",
      "session.title": "מתחילים את הסשן",
      "session.text": "הטיימר מתחיל וההתחייבות הופכת לאמיתית.",
      "session.hint": "ואז מניחים את הטלפון.",
      "outcome.title":
        "<span class=\"tline tline--hold\">נשארים.</span> <span class=\"tline tline--stake\">או משלמים.</span>",
      "outcome.text":
        "מסיימים את הסשן ושומרים על ההתחייבות. עוזבים מוקדם, וההשלכה מופעלת.",
      "why.kicker": "אודות",
      "why.title": "למה " + SOP + " עובדת",
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
      "cta.text": "הורידו את " + SOP + " מ־" + PLAY + " והפכו פוקוס להתחייבות אמיתית.",
      "cta.button": "הורדה מ־" + PLAY,
      "cta.playNote": "עמוד " + PLAY + " יעלה בקרוב",
      "cta.iosNote": "גרסת iPhone בקרוב",
      "contact.title": "יצירת קשר",
      "contact.lead": "לתמיכה או לשאלות בנושא פרטיות:",
      "footer.rights": "כל הזכויות שמורות.",
      "footer.privacy": "מדיניות פרטיות",
      "footer.terms": "תנאי שימוש",
      "footer.dataDeletion": "מדיניות מחיקת נתונים",
      "footer.deleteAccount": "מחיקת חשבון ונתונים",
      "meta.title": "Stay or Pay — נשארים בפוקוס. או משלמים.",
      "meta.description":
        "Stay or Pay הופכת כל סשן פוקוס להתחייבות אמיתית. מגדירים זמן, נשארים עד הסוף ועומדים במילה שלכם. הורדה מ־Google Play.",
      "aria.ctaPrimary": "הורדה מ־" + PLAY,
    },
  };

  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  var desktopNavQuery = window.matchMedia("(min-width: 960px)");

  function prefersReducedMotion() {
    return reduceMotionQuery.matches;
  }

  function currentStrings() {
    var locale = i18n.normalizeLocale(document.documentElement.lang);
    return TRANSLATIONS[locale] || TRANSLATIONS.en;
  }

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  /* ───────────────────────── Session length (shared state) ───────────────────────── */

  var DURATIONS = [25, 45, 60];
  var chosenMinutes = DURATIONS[0];
  /** @type {Array<function(number): void>} */
  var durationListeners = [];

  function onDurationChange(fn) {
    durationListeners.push(fn);
    fn(chosenMinutes);
  }

  function setChosenMinutes(minutes) {
    if (minutes === chosenMinutes) {
      return;
    }
    chosenMinutes = minutes;
    for (var i = 0; i < durationListeners.length; i += 1) {
      durationListeners[i](chosenMinutes);
    }
  }

  function formatClock(totalSeconds) {
    var seconds = Math.max(0, Math.round(totalSeconds));
    var mm = Math.floor(seconds / 60);
    var ss = seconds % 60;
    return mm + ":" + (ss < 10 ? "0" : "") + ss;
  }

  /* ───────────────────────── Locale ───────────────────────── */

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

    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-aria");
      if (!key || strings[key] === undefined) {
        return;
      }
      if (element.hasAttribute("data-nav-toggle") && document.body.classList.contains("is-nav-open")) {
        element.setAttribute("aria-label", strings["nav.close"] || strings[key]);
        return;
      }
      element.setAttribute("aria-label", strings[key]);
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

    for (var i = 0; i < durationListeners.length; i += 1) {
      durationListeners[i](chosenMinutes);
    }

    if (window.StayOrPayPlayStoreCta && window.StayOrPayPlayStoreCta.applyAll) {
      window.StayOrPayPlayStoreCta.applyAll();
    }
  }

  applyLocale(resolveInitialLocale());

  document.querySelectorAll("[data-set-locale]").forEach(function (button) {
    button.addEventListener("click", function () {
      var locale = button.getAttribute("data-set-locale");
      if (locale) {
        applyLocale(locale);
      }
    });
  });

  document.documentElement.classList.add("js");

  /* ───────────────────────── Navigation ───────────────────────── */

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  var scrim = document.querySelector("[data-nav-scrim]");

  function isDesktopNav() {
    return desktopNavQuery.matches;
  }

  function setNavOpen(open) {
    if (!nav || !toggle || !document.body.classList.contains("page-home")) {
      return;
    }

    if (isDesktopNav()) {
      document.body.classList.remove("is-nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", currentStrings()["nav.menu"]);
      nav.removeAttribute("inert");
      nav.removeAttribute("aria-hidden");
      if (scrim) {
        scrim.hidden = true;
      }
      return;
    }

    document.body.classList.toggle("is-nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", currentStrings()[open ? "nav.close" : "nav.menu"]);

    if (open) {
      nav.removeAttribute("inert");
      nav.removeAttribute("aria-hidden");
      if (scrim) {
        scrim.hidden = false;
      }
    } else {
      nav.setAttribute("inert", "");
      nav.setAttribute("aria-hidden", "true");
      if (scrim) {
        scrim.hidden = true;
      }
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!document.body.classList.contains("is-nav-open"));
    });

    if (scrim) {
      scrim.addEventListener("click", function () {
        setNavOpen(false);
        toggle.focus();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("is-nav-open")) {
        setNavOpen(false);
        toggle.focus();
      }
    });

    if (typeof desktopNavQuery.addEventListener === "function") {
      desktopNavQuery.addEventListener("change", function () {
        setNavOpen(false);
      });
    } else if (typeof desktopNavQuery.addListener === "function") {
      desktopNavQuery.addListener(function () {
        setNavOpen(false);
      });
    }

    setNavOpen(false);
  }

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
      setNavOpen(false);
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      if (target.id) {
        history.replaceState(null, "", targetId);
      }
    });
  });

  /* ───────────────────────── Install bar clearance ─────────────────────────
   * The Android install bar is real chrome floating over the page, so the
   * page has to give back the space it covers instead of hiding under it.
   */

  (function reserveInstallBar() {
    var banner = document.getElementById("android-play-banner");
    if (!banner) {
      return;
    }

    function measure() {
      var height = banner.hidden ? 0 : banner.offsetHeight;
      document.documentElement.style.setProperty("--install-bar", height + "px");
    }

    if (typeof window.ResizeObserver === "function") {
      new window.ResizeObserver(measure).observe(banner);
    }
    window.addEventListener("resize", measure, { passive: true });
    window.requestAnimationFrame(measure);
    window.setTimeout(measure, 400);
  })();

  /* ───────────────────────── Scroll scheduler ───────────────────────── */

  /** @type {Array<function(): void>} */
  var scrollTasks = [];
  var scrollScheduled = false;

  function runScrollTasks() {
    scrollScheduled = false;
    for (var i = 0; i < scrollTasks.length; i += 1) {
      scrollTasks[i]();
    }
  }

  function requestScrollUpdate() {
    if (scrollScheduled) {
      return;
    }
    scrollScheduled = true;
    window.requestAnimationFrame(runScrollTasks);
  }

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });

  /* ───────────────────────── Floating chrome ───────────────────────── */

  var header = document.querySelector(".page-home .landing-header");
  if (header) {
    scrollTasks.push(function () {
      header.classList.toggle("is-floating", window.scrollY > 10);
    });
  }

  /* ───────────────────────── Section entrances ───────────────────────── */

  var enterNodes = document.querySelectorAll("[data-enter]");
  if (enterNodes.length) {
    if (!prefersReducedMotion() && "IntersectionObserver" in window) {
      var enterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              enterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
      );
      enterNodes.forEach(function (node) {
        enterObserver.observe(node);
      });
    } else {
      enterNodes.forEach(function (node) {
        node.classList.add("is-in");
      });
    }
  }

  /* ───────────────────────── Spring ─────────────────────────
   * Apple's designer-facing parameterisation: damping ratio + response,
   * integrated from the presentation value so it can be interrupted
   * and re-targeted at any moment without a jump.
   */

  function Spring(value) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.configure(1, 0.4);
  }

  Spring.prototype.configure = function (dampingRatio, response) {
    var omega = (2 * Math.PI) / response;
    this.stiffness = omega * omega;
    this.damping = 2 * dampingRatio * omega;
  };

  Spring.prototype.step = function (dt) {
    var substeps = Math.max(1, Math.ceil(dt / 0.004));
    var h = dt / substeps;
    for (var i = 0; i < substeps; i += 1) {
      var a = -this.stiffness * (this.value - this.target) - this.damping * this.velocity;
      this.velocity += a * h;
      this.value += this.velocity * h;
    }
  };

  Spring.prototype.isSettled = function () {
    return Math.abs(this.velocity) < 0.03 && Math.abs(this.value - this.target) < 0.01;
  };

  /** Apple's momentum projection (exponential decay, not v²/2a). */
  function projectMomentum(velocity, decelerationRate) {
    var rate = decelerationRate === undefined ? 0.998 : decelerationRate;
    return (velocity / 1000) * rate / (1 - rate);
  }

  /** Progressive resistance past a boundary. */
  function rubberband(overshoot, dimension, constant) {
    var c = constant === undefined ? 0.55 : constant;
    return (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
  }

  /* ───────────────────────── The dial ───────────────────────── */

  (function setupDial() {
    var dial = document.querySelector("[data-dial]");
    var ringEl = document.querySelector("[data-dial-ring]");
    var timeEl = document.querySelector("[data-dial-time]");
    var picker = document.querySelector("[data-picker]");
    if (!dial || !ringEl || !timeEl || !picker) {
      return;
    }

    var options = Array.prototype.slice.call(picker.querySelectorAll("[data-minutes]"));
    var MIN = DURATIONS[0];
    var MAX = DURATIONS[DURATIONS.length - 1];
    var DEGREES_PER_MINUTE = 6;

    var spring = new Spring(chosenMinutes);
    var rendered = -1;
    var dragging = false;
    var rafId = 0;
    var lastFrame = 0;

    function nearestDuration(minutes) {
      var best = DURATIONS[0];
      var bestDistance = Infinity;
      for (var i = 0; i < DURATIONS.length; i += 1) {
        var distance = Math.abs(DURATIONS[i] - minutes);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = DURATIONS[i];
        }
      }
      return best;
    }

    function paint(minutes) {
      if (Math.abs(minutes - rendered) < 0.02) {
        return;
      }
      rendered = minutes;
      ringEl.style.setProperty("--arc", ((minutes / 60) * 100).toFixed(3));
      ringEl.style.setProperty("--angle", (minutes * DEGREES_PER_MINUTE).toFixed(2) + "deg");
    }

    function syncSelection(minutes) {
      options.forEach(function (option) {
        var isChosen = Number(option.getAttribute("data-minutes")) === minutes;
        option.classList.toggle("is-chosen", isChosen);
        option.setAttribute("aria-checked", isChosen ? "true" : "false");
        option.tabIndex = isChosen ? 0 : -1;
      });
      timeEl.textContent = formatClock(minutes * 60);
    }

    onDurationChange(syncSelection);

    function tick(now) {
      var dt = lastFrame ? Math.min((now - lastFrame) / 1000, 1 / 30) : 1 / 60;
      lastFrame = now;
      spring.step(dt);
      paint(spring.value);
      if (spring.isSettled()) {
        spring.value = spring.target;
        spring.velocity = 0;
        paint(spring.value);
        rafId = 0;
        lastFrame = 0;
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    }

    function startLoop() {
      if (rafId) {
        return;
      }
      lastFrame = 0;
      rafId = window.requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastFrame = 0;
    }

    /**
     * Animate to a duration from wherever the ring currently is.
     * @param {number} minutes
     * @param {number} velocity minutes per second carried in from a gesture
     */
    function settleTo(minutes, velocity) {
      setChosenMinutes(minutes);
      spring.target = minutes;
      spring.velocity = velocity || 0;
      if (prefersReducedMotion()) {
        spring.configure(1, 0.18);
        spring.velocity = 0;
      } else if (Math.abs(velocity || 0) > 4) {
        spring.configure(0.8, 0.4);
      } else {
        spring.configure(1, 0.4);
      }
      startLoop();
    }

    /* Pointer handling — 1:1 angular tracking with detent magnetism. */

    var pointerId = null;
    var centre = { x: 0, y: 0 };
    var lastAngle = 0;
    var rawMinutes = chosenMinutes;
    var samples = [];
    var movedEnough = false;
    var downPoint = { x: 0, y: 0 };
    var lastDetent = chosenMinutes;

    function angleAt(event) {
      return (Math.atan2(event.clientY - centre.y, event.clientX - centre.x) * 180) / Math.PI;
    }

    function shortestDelta(from, to) {
      var delta = to - from;
      while (delta > 180) {
        delta -= 360;
      }
      while (delta < -180) {
        delta += 360;
      }
      return delta;
    }

    function constrain(minutes) {
      if (minutes > MAX) {
        return MAX + rubberband(minutes - MAX, 12, 0.55);
      }
      if (minutes < MIN) {
        return MIN - rubberband(MIN - minutes, 12, 0.55);
      }
      return minutes;
    }

    function magnetise(minutes) {
      var detent = nearestDuration(minutes);
      return minutes + (detent - minutes) * 0.42;
    }

    ringEl.addEventListener("pointerdown", function (event) {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }
      var rect = ringEl.getBoundingClientRect();
      centre.x = rect.left + rect.width / 2;
      centre.y = rect.top + rect.height / 2;

      pointerId = event.pointerId;
      dragging = true;
      movedEnough = false;
      downPoint.x = event.clientX;
      downPoint.y = event.clientY;
      lastAngle = angleAt(event);
      rawMinutes = spring.value;
      lastDetent = nearestDuration(rawMinutes);
      samples = [{ t: event.timeStamp, v: rawMinutes }];

      stopLoop();
      ringEl.setPointerCapture(event.pointerId);
      dial.classList.add("is-grabbed");
      event.preventDefault();
    });

    ringEl.addEventListener("pointermove", function (event) {
      if (!dragging || event.pointerId !== pointerId) {
        return;
      }

      if (!movedEnough) {
        var dx = event.clientX - downPoint.x;
        var dy = event.clientY - downPoint.y;
        if (dx * dx + dy * dy < 36) {
          return;
        }
        movedEnough = true;
        lastAngle = angleAt(event);
      }

      var angle = angleAt(event);
      rawMinutes += shortestDelta(lastAngle, angle) / DEGREES_PER_MINUTE;
      lastAngle = angle;

      var constrained = constrain(rawMinutes);
      var shown = magnetise(constrained);
      spring.value = shown;
      spring.target = shown;
      spring.velocity = 0;
      paint(shown);

      var detent = nearestDuration(constrained);
      if (detent !== lastDetent) {
        lastDetent = detent;
        setChosenMinutes(detent);
        if (coarsePointerQuery.matches && typeof navigator.vibrate === "function") {
          navigator.vibrate(6);
        }
      }

      samples.push({ t: event.timeStamp, v: constrained });
      if (samples.length > 6) {
        samples.shift();
      }
    });

    function endDrag(event) {
      if (!dragging || (event && event.pointerId !== pointerId)) {
        return;
      }
      dragging = false;
      pointerId = null;
      dial.classList.remove("is-grabbed");

      var velocity = 0;
      if (samples.length > 1) {
        var first = samples[0];
        var last = samples[samples.length - 1];
        var seconds = (last.t - first.t) / 1000;
        if (seconds > 0.004) {
          velocity = (last.v - first.v) / seconds;
        }
      }

      var current = clamp(spring.value, MIN - 8, MAX + 8);
      var projected = movedEnough && !prefersReducedMotion()
        ? current + projectMomentum(velocity, 0.992)
        : current;
      settleTo(nearestDuration(projected), movedEnough ? velocity : 0);
    }

    ringEl.addEventListener("pointerup", endDrag);
    ringEl.addEventListener("pointercancel", endDrag);

    /* Explicit, accessible control: the three real session lengths. */

    options.forEach(function (option, index) {
      option.addEventListener("click", function () {
        settleTo(Number(option.getAttribute("data-minutes")), 0);
      });

      option.addEventListener("keydown", function (event) {
        var step = 0;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          step = document.documentElement.dir === "rtl" && event.key === "ArrowRight" ? -1 : 1;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          step = document.documentElement.dir === "rtl" && event.key === "ArrowLeft" ? 1 : -1;
        } else {
          return;
        }
        event.preventDefault();
        var next = options[(index + step + options.length) % options.length];
        next.focus();
        settleTo(Number(next.getAttribute("data-minutes")), 0);
      });
    });

    paint(chosenMinutes);
    syncSelection(chosenMinutes);
  })();

  /* ───────────────────────── Mirrored chips in the setup ───────────────────────── */

  (function setupChips() {
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-mirror-minutes]"));
    if (!chips.length) {
      return;
    }
    onDurationChange(function (minutes) {
      chips.forEach(function (chip) {
        chip.classList.toggle("is-chosen", Number(chip.getAttribute("data-mirror-minutes")) === minutes);
      });
    });
  })();

  /* ───────────────────────── The session ───────────────────────── */

  (function setupSession() {
    var track = document.querySelector("[data-session]");
    if (!track) {
      return;
    }

    var stage = track.querySelector(".session__stage");
    var timeEl = track.querySelector("[data-session-time]");
    var ringEl = track.querySelector("[data-session-ring]");
    var statEl = track.querySelector("[data-session-stat]");
    var lines = Array.prototype.slice.call(track.querySelectorAll("[data-session-line]"));
    if (!stage || !timeEl || !ringEl) {
      return;
    }

    var durationSeconds = chosenMinutes * 60;
    var lastClock = "";

    onDurationChange(function (minutes) {
      durationSeconds = minutes * 60;
      if (statEl) {
        statEl.textContent = "+" + minutes + " " + currentStrings()["time.unit"];
      }
      lastClock = "";
      update();
    });

    /** Smooth 0→1 ramp between two progress values. */
    function ramp(value, from, to) {
      return clamp((value - from) / (to - from), 0, 1);
    }

    function setStatic() {
      track.style.setProperty("--session-progress", "0");
      track.style.setProperty("--shell", "1");
      track.style.setProperty("--growth", "0");
      track.style.setProperty("--time-out", "0");
      track.style.setProperty("--ring-out", "0");
      track.style.setProperty("--resolve-in", "1");
      timeEl.textContent = formatClock(durationSeconds);
      ringEl.style.setProperty("--arc", "100");
      lines.forEach(function (line) {
        line.style.setProperty("--line-in", "1");
      });
    }

    function update() {
      if (prefersReducedMotion()) {
        setStatic();
        return;
      }

      var rect = track.getBoundingClientRect();
      var travel = Math.max(1, rect.height - stage.offsetHeight);
      var progress = clamp(-rect.top / travel, 0, 1);

      /* The phone itself is only present at the start: you put it down. */
      var shell = 1 - ramp(progress, 0.04, 0.26);
      /* The ring grows out of the screen and becomes the room. */
      var growth = ramp(progress, 0.04, 0.38);

      /* Time runs out before the end, leaving room for the result.
         The three hand off in sequence so nothing ever overlaps. */
      var elapsed = ramp(progress, 0, 0.84);
      var remaining = durationSeconds * (1 - elapsed);

      track.style.setProperty("--session-progress", progress.toFixed(4));
      track.style.setProperty("--shell", shell.toFixed(4));
      track.style.setProperty("--growth", growth.toFixed(4));
      track.style.setProperty("--time-out", ramp(progress, 0.85, 0.89).toFixed(3));
      track.style.setProperty("--ring-out", ramp(progress, 0.86, 0.91).toFixed(3));
      ringEl.style.setProperty("--arc", ((1 - elapsed) * 100).toFixed(3));

      var clock = formatClock(remaining);
      if (clock !== lastClock) {
        lastClock = clock;
        timeEl.textContent = clock;
      }

      lines.forEach(function (line, index) {
        var start = 0.18 + index * 0.21;
        var appear = clamp((progress - start) / 0.09, 0, 1);
        var fade = 1 - clamp((progress - (start + 0.17)) / 0.08, 0, 1);
        line.style.setProperty("--line-in", Math.min(appear, fade).toFixed(3));
      });

      track.style.setProperty("--resolve-in", ramp(progress, 0.91, 0.95).toFixed(3));
    }

    scrollTasks.push(update);

    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", update);
    }

    update();
  })();

  requestScrollUpdate();
})();
