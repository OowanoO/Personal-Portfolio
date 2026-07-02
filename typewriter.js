// ---------- typewriter role text ----------
const roles = ['Software Developer', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'Problem Analyst'];
const roleEl = document.getElementById('typedRole');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (roleEl) {
  if (prefersReducedMotion) {
    roleEl.textContent = roles[0];
  } else {
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
}
