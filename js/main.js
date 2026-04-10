// =============================================
// Main JS — Pura website ka JavaScript yahan hai
// =============================================

// =============================================
// LOADING SCREEN — Page load hone par hide karo
// =============================================
window.addEventListener('load', function () {
  // 1.8 second baad loader hide karo
  setTimeout(function () {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Animation khatam hone par remove karo
      setTimeout(() => loader.remove(), 700);
    }
  }, 1800);
});

// =============================================
// HAMBURGER MENU — Mobile menu toggle
// =============================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

// Hamburger button click par
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function () {
    // Toggle classes
    hamburger.classList.toggle('open');

    // Mobile menu open ya close
    if (hamburger.classList.contains('open')) {
      mobileMenu.style.display = 'flex';
      // Thodi der baad opacity add karo animation ke liye
      requestAnimationFrame(() => {
        mobileMenu.classList.add('open');
      });
      // Body scroll rokna
      document.body.style.overflow = 'hidden';
    } else {
      closeMobileMenu();
    }
  });

  // Mobile menu links par click — menu band karo
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      closeMobileMenu();
    });
  });

  // ESC key par menu band karo
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      hamburger.classList.remove('open');
      closeMobileMenu();
    }
  });
}

// Mobile menu band karne ka function
function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    // Animation ke baad display none karo
    setTimeout(() => {
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.style.display = 'none';
      }
    }, 400);
    document.body.style.overflow = '';
  }
}

// =============================================
// SCROLL ANIMATIONS — Elements scroll par dikhao
// =============================================
const fadeElements = document.querySelectorAll('.fade-up');

// Intersection Observer se scroll detect karo
if (fadeElements.length > 0) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // Element screen mein aaye to visible class lagao
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Ek baar animate hone ke baad unobserve karo
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 10% dikhne par trigger
      rootMargin: '0px 0px -50px 0px', // Bottom se thoda pehle
    }
  );

  // Har fade element ko observe karo
  fadeElements.forEach(function (el, index) {
    // Stagger animation delay
    el.style.transitionDelay = (index % 4) * 0.1 + 's';
    observer.observe(el);
  });
}

// =============================================
// ACTIVE NAV LINK — Current page highlight
// =============================================
function setActiveNavLink() {
  // Current page ka path lo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Har nav link check karo
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    const linkPage = link.getAttribute('href');
    // Match hone par active class lagao
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

// =============================================
// CONTACT FORM — Form submit handling
// =============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Default submit rokna

    // Submit button disable karo
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    // 1.5 second baad success message
    setTimeout(function () {
      if (submitBtn) {
        submitBtn.textContent = 'Message Sent!';
        // Form reset karo
        contactForm.reset();
        // Button wapas normal karo
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 3000);
      }
    }, 1500);
  });
}

// =============================================
// HERO CARD 3D TILT — Mouse move par effect
// =============================================
const heroCardWrapper = document.querySelector('.hero-card-wrapper');
const heroCard = document.querySelector('.hero-card');

if (heroCardWrapper && heroCard) {
  heroCardWrapper.addEventListener('mousemove', function (e) {
    const rect = heroCardWrapper.getBoundingClientRect();
    // Mouse position calculate karo
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Tilt values calculate karo
    const tiltX = (y - 0.5) * 15;
    const tiltY = (x - 0.5) * -15;
    // Floating animation pause karo aur tilt apply karo
    heroCard.style.animation = 'none';
    heroCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
  });

  // Mouse out par animation wapas karo
  heroCardWrapper.addEventListener('mouseleave', function () {
    heroCard.style.animation = 'float 6s ease-in-out infinite';
    heroCard.style.transform = '';
  });
}

// =============================================
// SMOOTH SECTION SCROLL — Nav links smooth scroll
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
