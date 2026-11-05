(() => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const langSwitch = document.getElementById("langSwitch");
  const year = document.getElementById("year");
  let lang = localStorage.getItem("portfolio-lang") || "fr";

  year.textContent = new Date().getFullYear();

  function setLanguage(nextLang) {
    lang = nextLang;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = window.translations?.[lang]?.[key];
      if (value) el.textContent = value;
    });
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
  };

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
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
