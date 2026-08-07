const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

const modal = document.querySelector('#booking-modal');
const bookingTrip = document.querySelector('#booking-form [name="trip"]');
document.querySelectorAll('.js-book').forEach(button => button.addEventListener('click', () => {
  bookingTrip.value = button.dataset.trip || 'Bespoke India journey';
  modal.showModal();
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('.booking-success').textContent = 'Thank you — your booking request is with our travel designers. We’ll be in touch within one business day.';
  event.currentTarget.reset();
});
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-success').textContent = 'Thank you — we’ll be in touch shortly.';
  event.currentTarget.reset();
});

const vasuToggle = document.querySelector('.vasu-toggle');
const vasuPanel = document.querySelector('.vasu-panel');
const closeVasu = document.querySelector('.vasu-close');
function setVasu(open) { vasuPanel.classList.toggle('open', open); vasuPanel.setAttribute('aria-hidden', !open); vasuToggle.setAttribute('aria-expanded', open); }
vasuToggle.addEventListener('click', () => setVasu(!vasuPanel.classList.contains('open')));
closeVasu.addEventListener('click', () => setVasu(false));
const chatMessages = document.querySelector('.vasu-messages');
const vasuForm = document.querySelector('.vasu-form');
const answers = {
  'best time to visit?': 'October to March is wonderful for a first journey across most of India. For the Himalayas, May through September brings clearer mountain weather.',
  'plan a honeymoon': 'A beautiful honeymoon could combine Udaipur’s lakes, a quiet Kerala retreat and a few nights in the Maldives. Would you like a relaxed or adventure-led pace?',
  'suggest a 10-day trip': 'For ten days, I’d pair Delhi and Agra with Jaipur, Jodhpur and Udaipur—the perfect mix of history, colour and exceptional hotels.'
};
function reply(text) { const m = document.createElement('div'); m.className = 'message vasu'; m.textContent = answers[text.toLowerCase()] || 'That sounds like a wonderful starting point. For a tailored recommendation, tell me your travel month, ideal pace, and who you’re travelling with.'; chatMessages.append(m); chatMessages.scrollTop = chatMessages.scrollHeight; }
function sendMessage(value) { if (!value.trim()) return; const m = document.createElement('div'); m.className = 'message user'; m.textContent = value; chatMessages.append(m); chatMessages.scrollTop = chatMessages.scrollHeight; setTimeout(() => reply(value), 450); }
document.querySelectorAll('.quick-prompts button').forEach(button => button.addEventListener('click', () => sendMessage(button.textContent)));
vasuForm.addEventListener('submit', event => { event.preventDefault(); const input = vasuForm.querySelector('input'); sendMessage(input.value); input.value = ''; });
document.querySelector('#year').textContent = new Date().getFullYear();
