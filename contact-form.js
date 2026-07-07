// ---------- contact form -> mailto ----------
const CONTACT_EMAIL = 'zhenyaowan10@gmail.com';

const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please fill in every field before sending.';
      formStatus.classList.add('show');
      return;
    }

    // play the paper-airplane send animation
    sendBtn.classList.add('sending');

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    formStatus.textContent = 'Opening your email app...';
    formStatus.classList.add('show');

    setTimeout(() => {
      window.location.href = mailtoLink;
      sendBtn.classList.remove('sending');
      contactForm.reset();
      setTimeout(() => formStatus.classList.remove('show'), 4000);
    }, 550);
  });
}
