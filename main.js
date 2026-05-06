// ============================================
// PORTFOLIO - SIMPLIFIED VERSION
// ============================================

"use strict";

// Основные элементы
const body = document.body;

// Инициализация при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio initialized");

  initLanguageSwitcher();
  initThemeToggle();
  initNavigation();
  initMobileMenu();
  initScrollEffects();
  initAnimations();
  initDownloadResume();

  // Modern upgrades
  initTypingEffect();
  initCursorGlow();
  initScrollProgress();
  initActiveSection();
  initCardTilt();
  initMagneticButtons();
  initStaggeredCards();
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

// ============================================
// 8. TYPING EFFECT
// ============================================

function initTypingEffect() {
  const profession = document.querySelector(".profession");
  if (!profession) return;

  const texts = ["Web Developer", "Backend Engineer", "Django Expert", "ERP Architect"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  profession.after(cursor);

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      profession.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      profession.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 55 : 110;

    if (!isDeleting && charIndex === currentText.length) {
      delay = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 450;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1200);
}

// ============================================
// 9. CURSOR GLOW
// ============================================

function initCursorGlow() {
  if (window.matchMedia("(hover: none)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";
    requestAnimationFrame(animate);
  }

  animate();
}

// ============================================
// 10. SCROLL PROGRESS BAR
// ============================================

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  }, { passive: true });
}

// ============================================
// 11. ACTIVE SECTION HIGHLIGHT IN NAV
// ============================================

function initActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active-link", isActive);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

// ============================================
// 12. 3D CARD TILT EFFECT
// ============================================

function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cards = document.querySelectorAll(".project-card, .service-card, .stat-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease";
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -7;
      const rotY = ((x - cx) / cx) * 7;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.01)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.3s ease";
      card.style.transform = "";
    });
  });
}

// ============================================
// 13. STAGGERED CARD ANIMATIONS ON SCROLL
// ============================================

function initStaggeredCards() {
  const grids = document.querySelectorAll(
    ".skills-grid, .services-grid, .projects-grid, .contact-methods"
  );

  grids.forEach((grid) => {
    const cards = Array.from(grid.children);
    cards.forEach((card) => card.classList.add("card-animate"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          Array.from(entry.target.children).forEach((card, i) => {
            setTimeout(() => {
              card.classList.add("card-visible");
            }, i * 110);
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(grid);
  });
}

// ============================================
// 14. MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
  if (window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll(".btn-primary, .btn-download").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translateY(-3px) translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}
