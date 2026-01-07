// Language Switcher
const langButtons = document.querySelectorAll("[data-lang-btn]");
const body = document.body;

// Check for saved language preference or default to 'ru'
const currentLang = localStorage.getItem("language") || "ru";
setLanguage(currentLang);

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang-btn");
    setLanguage(lang);
    localStorage.setItem("language", lang);
  });
});

function setLanguage(lang) {
  body.setAttribute("data-current-lang", lang);
  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
  });
}

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeSlider = document.querySelector(".theme-toggle-slider");

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const theme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
  themeSlider.textContent = theme === "dark" ? "🌙" : "☀️";
}

// Download Resume
const downloadBtn = document.getElementById("downloadResume");
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Функция скачивания резюме. Добавьте ссылку на ваш PDF файл!");
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target +
        (element.textContent.includes("+")
          ? "+"
          : element.textContent.includes("%")
          ? "%"
          : "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current) +
        (element.textContent.includes("+")
          ? "+"
          : element.textContent.includes("%")
          ? "%"
          : "");
    }
  }, 16);
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const text = statNumber.textContent;
        const number = parseInt(text.replace(/\D/g, ""));
        statNumber.textContent = "0";
        animateCounter(statNumber, number);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card);
});
