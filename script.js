/* =============================================
   VYNCH MIRANDA — Portfolio JS
   ============================================= */

(function () {
  'use strict';

  /* ─── HELPERS ─────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── MOBILE NAV ──────────────────────────── */
  const hamburger = $('#hamburger');
  const navLinks  = $('#nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(open));
    // Animate bars
    const bars = $$('span', hamburger);
    if (open) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked (mobile)
  $$('a', navLinks).forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const bars = $$('span', hamburger);
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    });
  });

  /* ─── ACTIVE NAV HIGHLIGHT ────────────────── */
  const sections = $$('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 80;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = $(`a[href="#${id}"]`, navLinks);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ─── SCROLL-IN ANIMATION ─────────────────── */
  const observerOpts = { threshold: 0.12 };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);

  $$('.section').forEach(sec => sectionObserver.observe(sec));

  /* ─── MODALS ──────────────────────────────── */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus trap: focus the close button
    const closeBtn = $('.modal-close', modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open buttons
  const btnScreenshots = $('#btn-screenshots');
  const btnCertificate = $('#btn-certificate');

  if (btnScreenshots) {
    btnScreenshots.addEventListener('click', () => openModal('modal-screenshots'));
  }
  if (btnCertificate) {
    btnCertificate.addEventListener('click', () => openModal('modal-certificate'));
  }

  // Close buttons inside modals
  $$('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) closeModal(target);
    });
  });

  // Close on overlay click
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $$('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
  });

  /* ─── BACK TO TOP ─────────────────────────── */
  const backTopBtn = $('#back-top');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── NAVBAR SHADOW ON SCROLL ─────────────── */
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.6)';
    } else {
      navbar.style.boxShadow = '';
    }
  }, { passive: true });

})();
