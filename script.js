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

// Theme gallery and local-currency presentation
const themes = {
  heritage: { kicker: 'Heritage & palaces', title: 'Royal stories, beautifully unhurried.', description: 'Walk through living forts, dine under painted ceilings and discover India’s enduring stories with a private guide.', hero: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1599661046827-dacde6976546?auto=format&fit=crop&w=1500&q=85', images: [['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85','Amber Fort'],['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85','Sunrise in Agra'],['https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85','Udaipur details'],['https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=900&q=85','Old city colour'],['https://images.unsplash.com/photo-1599661046827-dacde6976546?auto=format&fit=crop&w=900&q=85','Palace courtyards'],['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85','Jaipur at dusk']] },
  wildlife: { kicker: 'Wildlife & nature', title: 'Where the wild still sets the pace.', description: 'Follow expert naturalists from tiger country to quiet wetlands, with time for every track, birdsong and unforgettable sighting.', hero: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1500&q=85', images: [['https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=85','Tiger country'],['https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=900&q=85','Forest moments'],['https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=85','Wild India'],['https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85','Dawn safari'],['https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85','Open landscapes'],['https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=85','Nature close-up']] },
  wellness: { kicker: 'Wellness & slow travel', title: 'Space to breathe, time to arrive.', description: 'Gentle mornings, restorative stays and India’s deeply rooted wellness traditions, shaped around a slower rhythm.', hero: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1500&q=85', images: [['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85','Restorative rituals'],['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85','Kerala backwaters'],['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85','Morning practice'],['https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85','Quiet retreats'],['https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=85','Still waters'],['https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85','Golden hour']] },
  mountains: { kicker: 'Himalayan escape', title: 'The high places call you back.', description: 'Trade the everyday for clear mountain air, ancient monasteries and extraordinary roads across the Himalayas.', hero: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1500&q=85', images: [['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85','Roads of Ladakh'],['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85','Mountain dawn'],['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85','High valleys'],['https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=85','Quiet peaks'],['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85','The long road'],['https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=85','Above the clouds']] }
};
const gallery = document.querySelector('#theme-gallery');
function renderTheme(key) {
  const theme = themes[key]; if (!theme || !gallery) return;
  document.querySelector('#theme-kicker').textContent = theme.kicker;
  document.querySelector('#theme-name').textContent = theme.title;
  document.querySelector('#theme-description').textContent = theme.description;
  gallery.innerHTML = theme.images.map(([src, label]) => `<figure><img src="${src}" alt="${label}" loading="lazy"><figcaption>${label}</figcaption></figure>`).join('');
  document.querySelector('.hero-image').style.backgroundImage = `url("${theme.hero}")`;
  document.querySelector('.feature-image').style.backgroundImage = `url("${theme.feature}")`;
  document.querySelector('.experiences').style.setProperty('--experience-image', `url("${theme.feature}")`);
  document.querySelectorAll('.theme-tab').forEach(tab => { const active = tab.dataset.theme === key; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', active); });
}
document.querySelectorAll('.theme-tab').forEach(tab => tab.addEventListener('click', () => renderTheme(tab.dataset.theme)));
renderTheme('heritage');

const currencies = { US: ['USD', 'en-US', 1], IN: ['INR', 'en-IN', 83.12], GB: ['GBP', 'en-GB', .79], EU: ['EUR', 'de-DE', .92], AE: ['AED', 'en-AE', 3.67], AU: ['AUD', 'en-AU', 1.52], CA: ['CAD', 'en-CA', 1.37], SG: ['SGD', 'en-SG', 1.34] };
const pricing = document.createElement('section');
pricing.className = 'pricing-selector';
pricing.setAttribute('aria-label', 'Local currency pricing');
pricing.innerHTML = `<label for="pricing-country">I am planning from <select id="pricing-country"><option value="US">United States</option><option value="IN">India</option><option value="GB">United Kingdom</option><option value="EU">Europe (Euro)</option><option value="AE">United Arab Emirates</option><option value="AU">Australia</option><option value="CA">Canada</option><option value="SG">Singapore</option></select></label><small>Indicative conversion. Final payment is confirmed in the selected currency.</small>`;
document.querySelector('#packages').before(pricing);
const localCountry = pricing.querySelector('select');
function localPrice(usd) { const [currency, locale, rate] = currencies[localCountry.value]; return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(usd * rate); }
function renderPrices() {
  document.querySelectorAll('.js-price').forEach(node => node.textContent = localPrice(Number(node.dataset.usd)));
  document.querySelectorAll('.package').forEach((card, index) => {
    const prices = [3650, 4200, 4950, 6199]; const price = card.querySelector('div > span'); const book = card.querySelector('.mini-book');
    if (price) price.textContent = `From ${localPrice(prices[index])} pp`;
    if (book) book.firstChild.textContent = `Book from ${localPrice(199)} `;
  });
  const note = document.querySelector('.deposit-note'); if (note) note.innerHTML = `Secure any journey with a <strong>non-refundable ${localPrice(199)} booking deposit</strong>, fully adjustable against your final itinerary price.`;
}
localCountry.addEventListener('change', renderPrices); renderPrices();

// Complete the enquiry form with contact and country details.
const enquiry = document.querySelector('#contact-form');
if (enquiry) {
  const submit = enquiry.querySelector('[type="submit"]');
  const extra = document.createElement('div');
  extra.innerHTML = `<div class="form-row"><label>Phone number<input required type="tel" name="phone" autocomplete="tel" placeholder="Your number"></label><label>Country<select name="country"><option value="US">United States</option><option value="IN">India</option><option value="GB">United Kingdom</option><option value="EU">Europe (Euro)</option><option value="AE">United Arab Emirates</option><option value="AU">Australia</option><option value="CA">Canada</option><option value="SG">Singapore</option></select></label></div><label>Your travel ideas<textarea required name="message" rows="4" placeholder="Places, dates, travellers or anything you have in mind..."></textarea></label><p class="currency-note">We will reply with your itinerary and pricing in your preferred currency.</p>`;
  enquiry.insertBefore(extra, submit);
}
