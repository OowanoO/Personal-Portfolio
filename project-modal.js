// ---------- project card modal ----------
const modalOverlay = document.getElementById('projectModalOverlay');
const modalBody = document.getElementById('projectModalBody');
const modalClose = document.getElementById('projectModalClose');
const modalTriggers = document.querySelectorAll('.project-card-modal');

function openProjectModal(templateId) {
  const template = document.getElementById(templateId);
  if (!template || !modalOverlay || !modalBody) return;
  modalBody.innerHTML = '';
  modalBody.appendChild(template.content.cloneNode(true));
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
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
