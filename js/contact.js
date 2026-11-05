(() => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const endpoint = form.getAttribute('action');
    const lang = document.documentElement.lang;

    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    status.className = 'form-status';
    status.textContent = lang === 'fr' ? 'Envoi en cours…' : 'Sending…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      status.className = 'form-status success';
      status.textContent = lang === 'fr' ? 'Message envoyé. Merci !' : 'Message sent. Thank you!';
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = lang === 'fr' ? "Impossible d'envoyer le message pour le moment." : 'Unable to send the message right now.';
    } finally {
      submit.disabled = false;
    }
  });
})();
