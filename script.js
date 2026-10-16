const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const yearTarget = document.getElementById("year");
const newsletterForm = document.querySelector(".newsletter-form");

if (menuToggle && mainNav) {
  const mobileBreakpoint = window.matchMedia("(max-width: 900px)");

  if (!mainNav.id) {
    mainNav.id = "main-navigation";
  }

  menuToggle.setAttribute("aria-controls", mainNav.id);

  mainNav.querySelectorAll("a").forEach((link) => {
    const isCurrentPage = new URL(link.href).pathname === window.location.pathname;
    link.classList.toggle("active", isCurrentPage);
    link.toggleAttribute("aria-current", isCurrentPage);
  });

  const setMenuState = (isOpen) => {
    mainNav.classList.toggle("open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu mobile" : "Ouvrir le menu mobile",
    );

  };

  // A newly loaded page always starts with the mobile navigation closed.
  setMenuState(false);

  menuToggle.addEventListener("click", () => {
    setMenuState(!mainNav.classList.contains("open"));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileBreakpoint.matches && mainNav.classList.contains("open")) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenuState(false);
    }
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Merci !";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 1200);
    }
  });
});

const counters = document.querySelectorAll(".number");
const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  let value = 0;
  const step = Math.max(1, Math.ceil(target / 60));

  const interval = setInterval(() => {
    value += step;
    if (value >= target) {
      value = target;
      clearInterval(interval);
    }
    element.textContent = `${value}${target >= 100 ? "" : ""}`;
  }, 20);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".number");
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".benefit-card")
  .forEach((card) => observer.observe(card));
