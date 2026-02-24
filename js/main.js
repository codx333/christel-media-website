/* ══════════════════════════════════════════════════════════════
   CHRISTEL MEDIA — main.js
   Custom cursor · Mobile nav · Scroll reveal · Smooth scroll
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
(function initCursor() {
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('curRing');
  if (!cur || !ring) return;

  // Skip on touch-only devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cur.style.display  = 'none';
    ring.style.display = 'none';
    return;
  }

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Dot snaps instantly; ring trails with easing
  (function tick() {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';

    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(tick);
  })();

  // Expand cursor on interactive elements
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width  = cur.style.height  = '20px';
      ring.style.width = ring.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width  = cur.style.height  = '12px';
      ring.style.width = ring.style.height = '38px';
    });
  });
})();


/* ── MOBILE NAVIGATION ──────────────────────────────────────── */
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;

  function openMenu() {
    navMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Navigation schließen');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Navigation öffnen');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on any nav link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click / tap
  document.addEventListener('click', e => {
    if (navMenu.classList.contains('open') &&
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });
})();


/* ── SCROLL REVEAL ──────────────────────────────────────────── */
(function initReveal() {
  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('on'));
    document.querySelectorAll('.pfill').forEach(b => b.classList.add('on'));
    return;
  }

  // Reveal .rv elements as they enter the viewport
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        // Trigger any progress bars inside the revealed element
        entry.target.querySelectorAll('.pfill').forEach(b => b.classList.add('on'));
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));

  // Also watch the tvbox specifically for progress bars
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.pfill').forEach(b => b.classList.add('on'));
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.tvbox').forEach(el => barObs.observe(el));
})();


/* ── SMOOTH SCROLL ──────────────────────────────────────────── */
(function initSmoothScroll() {
  // Native scroll-behavior:smooth is set in CSS.
  // This JS layer adds nav-height offset so headings aren't hidden under the sticky nav.
  const nav = document.querySelector('nav');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return; // skip logo link

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      const navH   = nav ? nav.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
