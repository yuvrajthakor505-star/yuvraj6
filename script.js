/**
 * S & S UNISEX SALON - Ultra-Luxury Women's Salon JavaScript
 * Vanilla JS execution for animations, interactivity, sliders, and controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initPreloader();
  initHeaderAndNav();
  initScrollProgress();
  initHeroParticles();
  initScrollReveal();
  initAnimatedCounters();
  initBeforeAfterSlider();
  initTestimonialSlider();
  initGalleryAndLightbox();
  initCategoryTabs();
  initFaqAccordion();
  initMouseGlowAndRipples();
  initScrollToTop();
});

/* --------------------------------------------------------------------------
   1. Preloader
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 400);
  });

  // Fallback timeout in case load event already fired
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
    }
  }, 2000);
}

/* --------------------------------------------------------------------------
   2. Header & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeaderAndNav() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  // Mobile Drawer Toggle
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });

  // Close Mobile Menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      toggle?.classList.remove('active');
      navMenu?.classList.remove('active');

      // Smooth scroll target
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Highlight Active Section Link
  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

/* --------------------------------------------------------------------------
   4. Hero Floating Gold Particles Canvas
   -------------------------------------------------------------------------- */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      color: `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.2})`,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * 0.05
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#D4AF37';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. Animated Statistics Counter
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            counter.innerText = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            counter.innerText = `${count}${suffix}`;
          }
        }, 16);

        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   7. Before & After Image Comparison Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.ba-slider-container');
  const beforeImg = document.querySelector('.ba-img-before');
  const handle = document.querySelector('.ba-slider-handle');

  if (!container || !beforeImg || !handle) return;

  let isDragging = false;

  const updatePosition = (x) => {
    const rect = container.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;

    if (position < 0) position = 0;
    if (position > 100) position = 100;

    beforeImg.style.width = `${position}%`;
    handle.style.left = `${position}%`;
  };

  const onStart = (e) => {
    isDragging = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(x);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(x);
  };

  const onEnd = () => {
    isDragging = false;
  };

  container.addEventListener('mousedown', onStart);
  container.addEventListener('touchstart', onStart);

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove);

  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

/* --------------------------------------------------------------------------
   8. Testimonial Auto Slider
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.testimonial-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Create pagination dots
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer?.appendChild(dot);
  });

  const dots = document.querySelectorAll('.testimonial-dots .dot');

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  startAutoplay();

  const sliderBox = document.querySelector('.testimonial-slider-container');
  sliderBox?.addEventListener('mouseenter', stopAutoplay);
  sliderBox?.addEventListener('mouseleave', startAutoplay);

  // Touch swipe support
  let touchStartX = 0;
  sliderBox?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });

  sliderBox?.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(currentIndex);
    }
  });
}

/* --------------------------------------------------------------------------
   9. Gallery & Lightbox
   -------------------------------------------------------------------------- */
function initGalleryAndLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const prevBtn = lightbox?.querySelector('.lightbox-prev');
  const nextBtn = lightbox?.querySelector('.lightbox-next');

  if (!galleryItems.length || !lightbox || !lightboxImg) return;

  const imagesList = [];
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) imagesList.push(img.src);
  });

  let currentImgIndex = 0;

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentImgIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = imagesList[currentImgIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function showNext() {
    currentImgIndex = (currentImgIndex + 1) % imagesList.length;
    lightboxImg.src = imagesList[currentImgIndex];
  }

  function showPrev() {
    currentImgIndex = (currentImgIndex - 1 + imagesList.length) % imagesList.length;
    lightboxImg.src = imagesList[currentImgIndex];
  }

  closeBtn?.addEventListener('click', closeLightbox);
  nextBtn?.addEventListener('click', showNext);
  prevBtn?.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* --------------------------------------------------------------------------
   10. Category Tabs (Services & Gallery)
   -------------------------------------------------------------------------- */
function initCategoryTabs() {
  // Services Filtering
  const serviceTabs = document.querySelectorAll('.services-tabs .tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // Gallery Filtering
  const galleryTabs = document.querySelectorAll('.gallery-filters .tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isActive && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. Mouse Glow & Button Ripples
   -------------------------------------------------------------------------- */
function initMouseGlowAndRipples() {
  const glow = document.querySelector('.mouse-glow');

  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  // Ripple effect on buttons
  const rippleButtons = document.querySelectorAll('.btn-gold, .btn-outline-gold');

  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-circle');

      const existingRipple = this.querySelector('.ripple-circle');
      if (existingRipple) existingRipple.remove();

      this.appendChild(circle);
    });
  });
}

/* --------------------------------------------------------------------------
   13. Scroll To Top Button
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('active');
    } else {
      scrollTopBtn?.classList.remove('active');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
