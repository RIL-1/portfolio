(() => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const langSwitch = document.getElementById("langSwitch");
  const year = document.getElementById("year");
  let lang = localStorage.getItem("portfolio-lang") || "fr";

  year.textContent = new Date().getFullYear();

  function setMenuLabel() {
    const open = menuToggle.classList.contains("active");
    const key = open ? "aria.closeMenu" : "aria.openMenu";
    const value = window.translations?.[lang]?.[key];
    if (value) menuToggle.setAttribute("aria-label", value);
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = window.translations?.[lang]?.[key];
      if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.dataset.i18nAriaLabel;
      const value = window.translations?.[lang]?.[key];
      if (value) el.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.dataset.i18nAlt;
      const value = window.translations?.[lang]?.[key];
      if (value) el.setAttribute("alt", value);
    });
  }

  function setLanguage(nextLang) {
    lang = nextLang;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    applyTranslations();
    setMenuLabel();
    langSwitch.textContent = lang === "fr" ? "EN" : "FR";
    localStorage.setItem("portfolio-lang", lang);
  }

  setLanguage(lang);
  langSwitch.addEventListener("click", () =>
    setLanguage(lang === "fr" ? "en" : "fr"),
  );

  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    setMenuLabel();
  };

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    setMenuLabel();
  });
  navLinks
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  window.addEventListener("scroll", () =>
    header.classList.toggle("scrolled", window.scrollY > 16),
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  document.querySelectorAll(".timeline-head").forEach((button) => {
    button.addEventListener("click", () => {
      const body = button.nextElementSibling;
      const open = body.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      button.querySelector(".toggle-icon").textContent = open ? "−" : "+";
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  sections.forEach((section) => activeObserver.observe(section));
})();
