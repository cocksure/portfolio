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
  initImmersiveHeroScene();
  initProjectHoverShowcase();

  setTimeout(() => {
    body.classList.add("hero-intro-done");
  }, 1800);
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
  }, { passive: true });

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

  // Наблюдаем только за секциями, которым реально нужен fade-in.
  document.querySelectorAll(".fade-in").forEach((section) => {
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
  const particles = document.querySelectorAll(".particle");

  // Параллакс частиц только на десктопе
  if (!particles.length || window.matchMedia("(hover: none)").matches) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      particles.forEach((particle, index) => {
        const speed = 0.3 + index * 0.1;
        particle.style.transform = `translateY(${-(scrolled * speed * 0.1)}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
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
  let charIndex = texts[0].length;
  let isDeleting = true;
  const stableSpace = "\u00a0";
  const textNode = document.createTextNode(stableSpace + texts[0]);

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  profession.textContent = "";
  profession.append(textNode, cursor);

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      textNode.nodeValue = stableSpace + currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textNode.nodeValue = stableSpace + currentText.substring(0, charIndex + 1);
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
  let rafId = null;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

    if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  }
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
  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      });

      let activeId = null;
      sections.forEach((s) => {
        if (visible.has(s.id) && activeId === null) activeId = s.id;
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active-link", link.getAttribute("href") === `#${activeId}`);
      });
    },
    { threshold: 0.1, rootMargin: "-80px 0px -20% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

// ============================================
// 12. 3D CARD TILT EFFECT
// ============================================

function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cards = document.querySelectorAll(".service-card, .stat-card");

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
    ".skills-grid, .services-grid, .contact-methods"
  );

  grids.forEach((grid) => {
    const cards = Array.from(grid.children);
    cards.forEach((card) => card.classList.add("card-animate"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const isAlreadyPastTop = entry.boundingClientRect.top < 0;

          Array.from(entry.target.children).forEach((card, i) => {
            setTimeout(() => {
              card.classList.add("card-visible");
            }, isAlreadyPastTop ? 0 : i * 120);
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

// ============================================
// 15. LUSION-INSPIRED HERO CANVAS
// ============================================

function initImmersiveHeroScene() {
  const canvas = document.getElementById("heroVisualizer");
  const hero = document.querySelector(".hero");
  if (!canvas || !hero) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let points = [];
  let rafId = null;
  let isHeroVisible = true;
  let pointer = { x: 0.5, y: 0.5, active: false };

  const palette = [
    [99, 102, 241],
    [6, 182, 212],
    [163, 230, 53],
    [249, 115, 22],
  ];

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(320, rect.width);
    height = Math.max(480, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = width < 700 ? 24 : 42;
    points = Array.from({ length: count }, (_, index) => {
      const color = palette[index % palette.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: 1.3 + Math.random() * 2.8,
        phase: Math.random() * Math.PI * 2,
        color,
      };
    });
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const pointerX = pointer.x * width;
    const pointerY = pointer.y * height;

    const gradient = ctx.createRadialGradient(
      pointerX,
      pointerY,
      0,
      pointerX,
      pointerY,
      Math.max(width, height) * 0.55
    );
    gradient.addColorStop(0, "rgba(163, 230, 53, 0.09)");
    gradient.addColorStop(0.45, "rgba(6, 182, 212, 0.045)");
    gradient.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    points.forEach((point, index) => {
      const driftX = Math.sin(t * 0.75 + point.phase) * 18;
      const driftY = Math.cos(t * 0.62 + point.phase) * 16;
      point.baseX += point.vx;
      point.baseY += point.vy;

      if (point.baseX < -40 || point.baseX > width + 40) point.vx *= -1;
      if (point.baseY < -40 || point.baseY > height + 40) point.vy *= -1;

      const dx = pointerX - point.baseX;
      const dy = pointerY - point.baseY;
      const distance = Math.hypot(dx, dy);
      const pull = pointer.active ? Math.max(0, 1 - distance / 280) : 0;

      point.x = point.baseX + driftX + dx * pull * 0.08;
      point.y = point.baseY + driftY + dy * pull * 0.08;

      for (let j = index + 1; j < points.length; j++) {
        const other = points[j];
        const linkDistance = Math.hypot(point.x - other.x, point.y - other.y);
        if (linkDistance > 150) continue;

        const alpha = (1 - linkDistance / 150) * 0.24;
        ctx.strokeStyle = `rgba(${point.color.join(",")}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });

    points.forEach((point) => {
      const pulse = Math.sin(t * 2 + point.phase) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(${point.color.join(",")}, ${0.45 + pulse * 0.45})`;
      ctx.shadowColor = `rgba(${point.color.join(",")}, 0.8)`;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size + pulse * 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (rafId || prefersReducedMotion.matches || !isHeroVisible) return;
    rafId = requestAnimationFrame(draw);
  }

  function stop() {
    if (!rafId) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  hero.addEventListener("pointermove", (e) => {
    const rect = hero.getBoundingClientRect();
    pointer.x = (e.clientX - rect.left) / rect.width;
    pointer.y = (e.clientY - rect.top) / rect.height;
    pointer.active = true;
  });

  hero.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resize, { passive: true });
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      isHeroVisible = Boolean(entry?.isIntersecting);

      if (isHeroVisible) {
        start();
      } else {
        stop();
      }
    },
    { threshold: 0.05 }
  );

  visibilityObserver.observe(hero);

  const handleMotionPreference = () => {
    if (prefersReducedMotion.matches) {
      stop();
      ctx.clearRect(0, 0, width, height);
    } else {
      resize();
      start();
    }
  };

  if (prefersReducedMotion.addEventListener) {
    prefersReducedMotion.addEventListener("change", handleMotionPreference);
  } else if (prefersReducedMotion.addListener) {
    prefersReducedMotion.addListener(handleMotionPreference);
  }

  resize();
  start();
}

// ============================================
// 16. PROJECT HOVER SHOWCASE
// ============================================

function initProjectHoverShowcase() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  const preview = document.createElement("div");
  preview.className = "project-hover-preview";
  document.body.appendChild(preview);

  let targetX = window.innerWidth * 0.72;
  let targetY = window.innerHeight * 0.5;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  function setPreview(card) {
    const image = card.querySelector(".project-image img");
    const icon = card.querySelector(".project-icon");

    if (image) {
      preview.innerHTML = `<img src="${image.getAttribute("src")}" alt="">`;
    } else if (icon) {
      preview.innerHTML = `<span>${icon.textContent.trim()}</span>`;
    }
  }

  function animatePreview() {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    preview.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(-2deg)`;
    rafId = requestAnimationFrame(animatePreview);
  }

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      setPreview(card);
      preview.classList.add("active");
      card.classList.add("project-card-active");
      if (!rafId) animatePreview();
    });

    card.addEventListener("mousemove", (event) => {
      targetX = Math.min(window.innerWidth - 220, event.clientX + 180);
      targetY = Math.min(window.innerHeight - 140, Math.max(140, event.clientY));
      card.style.setProperty("--project-mouse-x", `${event.clientX}px`);
    });

    card.addEventListener("mouseleave", () => {
      preview.classList.remove("active");
      card.classList.remove("project-card-active");
    });
  });
}
