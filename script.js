// ---------- year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
