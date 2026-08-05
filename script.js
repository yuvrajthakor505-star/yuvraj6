/**
 * SHARMA SALON — ULTRA-PREMIUM VANILLA JAVASCRIPT ENGINE
 * Full functionality for mobile nav, scroll effects, image comparison, 
 * lightbox gallery, auto reviews slider, FAQ accordion & counter stats.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRELOADER
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 300);
    });
  }

  // 2. MOUSE CURSOR GLOW EFFECT
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.innerWidth >= 1024) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 3. SCROLL PROGRESS BAR & SCROLL TO TOP
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrolled}%`;
    }

    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active Nav Highlight
    updateActiveNav();
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. MOBILE HAMBURGER MENU
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 5. ACTIVE NAV HIGHLIGHT ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 6. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. ANIMATED STATISTICS COUNTER
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 50);
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = count.toLocaleString() + suffix;
          }, 30);
        });
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // 8. SERVICES FILTER TABS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 9. BEFORE & AFTER IMAGE COMPARISON SLIDER
  const comparisonSlider = document.querySelector('.comparison-slider-input');
  const imgAfterWrapper = document.querySelector('.img-after-wrapper');
  const comparisonHandle = document.querySelector('.comparison-handle');

  if (comparisonSlider && imgAfterWrapper && comparisonHandle) {
    comparisonSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      imgAfterWrapper.style.width = `${value}%`;
      comparisonHandle.style.left = `${value}%`;
    });
  }

  // 10. BEAUTY TIPS ACCORDION
  const tipCards = document.querySelectorAll('.tip-card');

  tipCards.forEach(card => {
    const header = card.querySelector('.tip-header');
    const body = card.querySelector('.tip-body');

    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      // Close all other tip cards
      tipCards.forEach(c => {
        c.classList.remove('active');
        const b = c.querySelector('.tip-body');
        if (b) b.style.maxHeight = null;
      });

      if (!isActive) {
        card.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // 11. GALLERY LIGHTBOX
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentGalleryIndex = 0;
  const galleryImages = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('.gallery-img');
    const title = item.querySelector('.gallery-title')?.textContent || '';
    if (img) {
      galleryImages.push({ src: img.src, alt: title });
      item.addEventListener('click', () => {
        currentGalleryIndex = index;
        openLightbox(currentGalleryIndex);
      });
    }
  });

  function openLightbox(index) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      openLightbox(currentGalleryIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      openLightbox(currentGalleryIndex);
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    }
  });

  // 12. AUTO SLIDING TESTIMONIAL CAROUSEL
  const track = document.querySelector('.reviews-track');
  const slides = document.querySelectorAll('.review-slide');
  const dotsNav = document.querySelector('.carousel-dots');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;

    // Create dots dynamically
    if (dotsNav) {
      dotsNav.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsNav.appendChild(dot);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // Auto Play Every 5 Seconds
    let autoSlideTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    }, 5000);

    // Pause on hover
    const carouselWrapper = document.querySelector('.reviews-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
      carouselWrapper.addEventListener('mouseleave', () => {
        autoSlideTimer = setInterval(() => {
          currentIndex = (currentIndex + 1) % slideCount;
          goToSlide(currentIndex);
        }, 5000);
      });
    }
  }

  // 13. RIPPLE BUTTON EFFECT
  const rippleBtns = document.querySelectorAll('.btn-luxury');
  rippleBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.4)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject Keyframes for Ripple Effect
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes ripple {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

});
