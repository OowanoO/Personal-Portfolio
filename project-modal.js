// ---------- project card modal ----------
const modalOverlay = document.getElementById('projectModalOverlay');
const modalBody = document.getElementById('projectModalBody');
const modalClose = document.getElementById('projectModalClose');
const modalTriggers = document.querySelectorAll('.project-card-modal');

// Critical styles applied directly via JS so the modal always renders
// correctly even if styles.css hasn't loaded/updated yet.
if (modalOverlay) {
  Object.assign(modalOverlay.style, {
    position: 'fixed',
    inset: '0',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'rgba(6,7,9,0.82)',
    zIndex: '999999',
  });
}
const modalPanel = modalOverlay ? modalOverlay.querySelector('.project-modal') : null;
if (modalPanel) {
  Object.assign(modalPanel.style, {
    maxWidth: '680px',
    width: '100%',
    maxHeight: '85vh',
    overflowY: 'auto',
    position: 'relative',
  });
}

function openProjectModal(templateId) {
  const template = document.getElementById(templateId);
  if (!template || !modalOverlay || !modalBody) return;

  modalBody.innerHTML = '';
  modalBody.appendChild(template.content.cloneNode(true));

  modalOverlay.style.display = 'flex';
  // allow the browser to paint display:flex before adding the class
  // that drives the fade/scale transition defined in styles.css
  requestAnimationFrame(() => modalOverlay.classList.add('open'));

  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!modalOverlay.classList.contains('open')) {
      modalOverlay.style.display = 'none';
    }
  }, 260);
}

modalTriggers.forEach((card) => {
  const targetId = card.getAttribute('data-modal-target');

  card.addEventListener('click', () => openProjectModal(targetId));

  // keyboard accessible (Enter / Space) since the card isn't a native button
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(targetId);
    }
  });
});

if (modalClose) modalClose.addEventListener('click', closeProjectModal);

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// safety net: never leave the page permanently unscrollable
window.addEventListener('error', () => {
  if (!modalOverlay || modalOverlay.style.display !== 'flex') {
    document.body.style.overflow = '';
  }
});
