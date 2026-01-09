// ============================================
// PORTFOLIO - SIMPLIFIED VERSION
// ============================================

"use strict";

// Основные элементы
const body = document.body;

// Инициализация при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio initialized");

  // Инициализация основных функций
  initLanguageSwitcher();
  initThemeToggle();
  initNavigation();
  initMobileMenu();
  initScrollEffects();
  initAnimations();
  initDownloadResume();
});

// ============================================
// 1. LANGUAGE SWITCHER
// ============================================

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll("[data-lang-btn]");

  // Проверяем сохраненный язык
  const savedLang = localStorage.getItem("portfolio_language") || "ru";
  setLanguage(savedLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-btn");
      setLanguage(lang);
      localStorage.setItem("portfolio_language", lang);
    });
  });

  function setLanguage(lang) {
    body.setAttribute("data-current-lang", lang);

    // Обновляем активную кнопку
    langButtons.forEach((btn) => {
      const isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("active", isActive);
    });
  }
}

// ============================================
// 2. THEME TOGGLE
// ============================================

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeSlider = document.querySelector(".theme-toggle-slider");

  if (!themeToggle) return;

  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio_theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (themeSlider) {
      themeSlider.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }
}

// ============================================
// 3. NAVIGATION & MOBILE MENU
// ============================================

function initNavigation() {
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scrollTop");

  // Эффект скролла для навбара
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    // Кнопка "наверх"
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  // Кнопка "наверх"
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ============================================
// 3. MOBILE MENU (УЛУЧШЕННАЯ ВЕРСИЯ)
// ============================================

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!mobileMenuBtn || !navLinks) return;

  // Открытие/закрытие по кнопке
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Предотвращаем всплытие
    toggleMenu();
  });

  // Закрытие при клике на ссылку
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // ✨ НОВОЕ: Закрытие при клике вне sidebar
  document.addEventListener("click", (e) => {
    const isMenuOpen = navLinks.classList.contains("active");
    const clickedInsideMenu = navLinks.contains(e.target);
    const clickedMenuButton = mobileMenuBtn.contains(e.target);

    // Если меню открыто И клик ВНЕ меню И клик НЕ по кнопке
    if (isMenuOpen && !clickedInsideMenu && !clickedMenuButton) {
      closeMenu();
    }
  });

  // ✨ НОВОЕ: Закрытие по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMenu();
    }
  });

  // ✨ НОВОЕ: Блокировка скролла при открытом меню
  function toggleMenu() {
    const isOpen = navLinks.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    mobileMenuBtn.classList.add("active");
    navLinks.classList.add("active");
    document.body.style.overflow = "hidden"; // Блокируем скролл
  }

  function closeMenu() {
    mobileMenuBtn.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = ""; // Разблокируем скролл
  }
}

// ============================================
// 4. ANIMATIONS
// ============================================

function initAnimations() {
  // Intersection Observer для fade-in анимаций
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Наблюдаем за всеми секциями
  document.querySelectorAll("section").forEach((section) => {
    fadeObserver.observe(section);
  });

  // Анимированные счетчики
  const statCards = document.querySelectorAll(".stat-card");
  if (statCards.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector(".stat-number");
            if (statNumber && !statNumber.classList.contains("animated")) {
              animateCounter(statNumber);
              statNumber.classList.add("animated");
            }
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statCards.forEach((card) => counterObserver.observe(card));
  }

  function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ""));
    const suffix = text.match(/[+%]/)?.[0] || "";

    let current = 0;
    const increment = number / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        element.textContent = number + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 30);
  }
}

// ============================================
// 5. SCROLL EFFECTS
// ============================================

function initScrollEffects() {
  // Параллакс для частиц (опционально)
  const particles = document.querySelectorAll(".particle");

  if (particles.length) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      particles.forEach((particle, index) => {
        const speed = 0.3 + index * 0.1;
        const yPos = -(scrolled * speed * 0.1);
        particle.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// ============================================
// 6. DOWNLOAD RESUME
// ============================================

function initDownloadResume() {
  const downloadBtn = document.getElementById("downloadResume");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Анимация кнопки
      const originalHTML = downloadBtn.innerHTML;
      downloadBtn.innerHTML = "⏳ Загрузка...";

      setTimeout(() => {
        // Здесь будет реальное скачивание файла
        // const resumeUrl = 'path/to/your/resume.pdf';
        // window.open(resumeUrl, '_blank');

        // Временно показываем сообщение
        alert(
          "Резюме будет доступно для скачивания. Добавьте ссылку на ваш PDF файл в коде!"
        );

        // Восстанавливаем кнопку
        downloadBtn.innerHTML = originalHTML;
      }, 800);
    });
  }
}

// В конец файла добавьте:

// ============================================
// 7. PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy loading для изображений
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  });
} else {
  // Fallback для старых браузеров
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// Отслеживание ошибок (опционально)
window.addEventListener("error", (e) => {
  console.error("Portfolio Error:", e.message);
});
