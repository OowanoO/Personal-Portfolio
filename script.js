// ---------- year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- page loader ----------
const pageLoader = document.getElementById('pageLoader');
if (pageLoader) {
  document.body.style.overflow = 'hidden';
  const MIN_VISIBLE_MS = 700;
  const shownAt = Date.now();

  const hideLoader = () => {
    const elapsed = Date.now() - shownAt;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setTimeout(() => {
      pageLoader.classList.add('loaded');
      document.body.style.overflow = '';
    }, wait);
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
}

// ---------- nav scroll state ----------
const nav = document.getElementById('siteNav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', scrolled);
  toTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- mobile menu ----------
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');
hamburger.addEventListener('click', () => mobilePanel.classList.toggle('open'));
mobilePanel.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobilePanel.classList.remove('open'))
);

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));