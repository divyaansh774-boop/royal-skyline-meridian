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
let finderInterest = 'Private journey';
document.querySelectorAll('.finder-tab').forEach(tab => tab.addEventListener('click', () => {
  finderInterest = tab.dataset.interest;
  document.querySelectorAll('.finder-tab').forEach(item => item.classList.toggle('is-active', item === tab));
}));
document.querySelector('#journey-finder-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  bookingTrip.value = `${data.get('destination')} — ${finderInterest}`;
  const bookingForm = document.querySelector('#booking-form');
  [...bookingForm.elements.when.options].some(option => { if (option.textContent === data.get('when')) { option.selected = true; return true; } return false; });
  [...bookingForm.elements.travelers.options].some(option => { if (option.textContent === data.get('travellers')) { option.selected = true; return true; } return false; });
  modal.showModal();
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
themes.heritage = {
  kicker: 'Rajasthan / 8 nights', title: 'Pink cities, blue lanes & desert skies.', description: 'This is Rajasthan in its own colour palette: Amber Fort at first light, hand-painted palace rooms, the blue lanes of Jodhpur, Udaipur at sunset and one unforgettable night in the Thar Desert.', hero: 'https://images.unsplash.com/photo-1599661046827-dacde6976546?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1500&q=85', route: 'Jaipur · Jodhpur · Udaipur · Jaisalmer', pace: 'Private guide · Palace stays · 8 nights', images: [['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85','Amber Fort, Jaipur'],['https://images.unsplash.com/photo-1599661046827-dacde6976546?auto=format&fit=crop&w=900&q=85','Jaipur palace detail'],['https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85','Udaipur heritage'],['https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=900&q=85','Jodhpur old town'],['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85','Rajasthan at dusk'],['https://images.unsplash.com/photo-1680140979890-101e2798dddf?auto=format&fit=crop&w=900&q=85','Ranthambore tiger safari']] };
themes.wildlife = {
  kicker: 'Ranthambore / 4 nights', title: 'A tiger landscape, not a zoo.', description: 'Morning and afternoon game drives are shaped around the park’s rhythm. Between safaris, stay close to the forest, trace the old fort and let the anticipation be part of the journey.', hero: 'https://images.unsplash.com/photo-1680140979890-101e2798dddf?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1500&q=85', route: 'Jaipur · Sawai Madhopur · Ranthambore', pace: 'Naturalist-led safaris · Boutique lodge · 4 nights', images: [['https://images.unsplash.com/photo-1680140979890-101e2798dddf?auto=format&fit=crop&w=1200&q=85','Tiger in Ranthambore'],['https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=85','Quiet tiger country'],['https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85','Forest light'],['https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=85','Wild India'],['https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85','Dawn on safari'],['https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85','Open reserve landscape']] };
themes.wellness = {
  kicker: 'Kerala / 7 nights', title: 'Backwaters, spice air & a slower rhythm.', description: 'Kerala should never feel rushed: tea country mornings, a private houseboat on the backwaters, Ayurvedic rituals and long, unhurried meals by the water.', hero: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1587922546307-776ae25f10b0?auto=format&fit=crop&w=1500&q=85', route: 'Kochi · Munnar · Kumarakom · Marari', pace: 'Houseboat night · Wellness stay · 7 nights', images: [['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85','Kerala backwaters'],['https://images.unsplash.com/photo-1587922546307-776ae25f10b0?auto=format&fit=crop&w=900&q=85','Munnar tea country'],['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85','Ayurvedic ritual'],['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85','Slow morning'],['https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=85','Waterfront pause'],['https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85','Kerala golden hour']] };
themes.mountains = {
  kicker: 'Ladakh / 9 nights', title: 'Monasteries, mountain passes & wide-open silence.', description: 'Ladakh is built around the road: clear high-altitude mornings, quiet monasteries, Pangong’s shifting blues and considered acclimatisation at every step.', hero: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2200&q=90', feature: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=85', route: 'Leh · Nubra Valley · Pangong Lake', pace: 'Private driver-guide · Acclimatised route · 9 nights', images: [['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85','Ladakh mountain road'],['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85','Himalayan dawn'],['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85','High valley'],['https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=85','Ladakh quiet'],['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85','Road to Pangong'],['https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=85','Above the clouds']] };

Object.assign(themes.heritage, {
  hero: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2200&q=90',
  feature: 'https://d37rmf1ynyg9aw.cloudfront.net/fit-in/1280x1280/data/v4/pois/2221ed9d-2397-4276-8a7a-0de7434da393/resources/127329.jpg',
  images: [
    ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85', 'Amber Fort, Jaipur'],
    ['https://d37rmf1ynyg9aw.cloudfront.net/fit-in/1280x1280/data/v4/pois/2221ed9d-2397-4276-8a7a-0de7434da393/resources/127329.jpg', 'City Palace, Jaipur'],
    ['https://s7ap1.scene7.com/is/image/incredibleindia/city-palace-udaipur-rajasthan-4-musthead-hero?qlt=82&ts=1742185179842', 'City Palace, Udaipur'],
    ['https://2.bp.blogspot.com/-31dg5A3dVqw/WcNPY-_FA1I/AAAAAAAAFzA/nCxpfb08X08vofuSYJxV6G2FGHPwAgBkQCK4BGAYYCw/w1200-h630-p-k-no-nu/Mehrangarh-Fort-Aerial-View.jpg', 'Mehrangarh Fort, Jodhpur'],
    ['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85', 'Hawa Mahal, Jaipur'],
    ['https://images.unsplash.com/photo-1680140979890-101e2798dddf?auto=format&fit=crop&w=900&q=85', 'Tiger safari, Ranthambore']
  ]
});

const gallery = document.querySelector('#theme-gallery');
const themeCard = document.createElement('div');
themeCard.className = 'theme-trip-card';
gallery.after(themeCard);
const themeDialog = document.createElement('dialog');
themeDialog.className = 'destination-dialog';
themeDialog.setAttribute('aria-label', 'Destination journey preview');
document.body.append(themeDialog);

function openThemePreview(key) {
  const theme = themes[key];
  if (!theme) return;
  renderTheme(key);
  themeDialog.innerHTML = `<div class="destination-dialog-inner"><button class="dialog-close" aria-label="Close destination preview">×</button><p class="eyebrow">${theme.kicker}</p><h2>${theme.title}</h2><p>${theme.description}</p><div class="destination-dialog-meta"><span>${theme.route}</span><span>${theme.pace}</span></div><div class="destination-dialog-gallery">${theme.images.slice(0, 3).map(([src, label]) => `<img src="${src}" alt="${label}">`).join('')}</div><button class="button button-blue js-dialog-book">Plan this journey <span>→</span></button></div>`;
  themeDialog.querySelector('.dialog-close').addEventListener('click', () => themeDialog.close());
  themeDialog.querySelector('.js-dialog-book').addEventListener('click', () => { themeDialog.close(); bookingTrip.value = theme.kicker; modal.showModal(); });
  themeDialog.showModal();
}
themeDialog.addEventListener('click', event => { if (event.target === themeDialog) themeDialog.close(); });
function renderTheme(key) {
  const theme = themes[key]; if (!theme || !gallery) return;
  document.querySelector('#theme-kicker').textContent = theme.kicker;
  document.querySelector('#theme-name').textContent = theme.title;
  document.querySelector('#theme-description').textContent = theme.description;
  gallery.innerHTML = theme.images.map(([src, label]) => `<figure><img src="${src}" alt="${label}" loading="lazy"><figcaption>${label}</figcaption></figure>`).join('');
  themeCard.innerHTML = `<div><small>TRAVELLER'S ROUTE</small><b>${theme.route}</b><p>${theme.pace}</p></div><p>Every stop is designed to give you enough time to experience the place—not simply collect it.</p><button class="button js-book" data-trip="${theme.kicker}">Plan this route <span>→</span></button>`;
  themeCard.querySelector('.js-book').addEventListener('click', () => { bookingTrip.value = theme.kicker; modal.showModal(); });
  document.querySelector('.hero-image').style.backgroundImage = `url("${theme.hero}")`;
  document.querySelector('.feature-image').style.backgroundImage = `url("${theme.feature}")`;
  document.querySelector('.experiences').style.setProperty('--experience-image', `url("${theme.feature}")`);
  document.querySelectorAll('.theme-tab').forEach(tab => { const active = tab.dataset.theme === key; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', active); });
}
document.querySelectorAll('.theme-tab').forEach(tab => tab.addEventListener('click', () => renderTheme(tab.dataset.theme)));
document.querySelectorAll('.js-theme-link').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  openThemePreview(link.dataset.theme);
}));
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

// Keep every featured journey visually and geographically accurate.
const packageDetails = [
  {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85',
    alt: 'Hawa Mahal in Jaipur, Rajasthan',
    nights: '07 nights · Rajasthan',
    title: 'Golden Cities & Blue Skies'
  },
  {
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85',
    alt: 'Houseboat on the Kerala backwaters',
    nights: '09 nights · Kerala',
    title: 'The Spice Coast'
  },
  {
    image: 'https://images.unsplash.com/photo-1680140979890-101e2798dddf?auto=format&fit=crop&w=1200&q=85',
    alt: 'Bengal tiger in Ranthambore National Park',
    nights: '06 nights · Ranthambore',
    title: 'In Search of the Tiger'
  },
  {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    alt: 'Amber Fort in Jaipur, Rajasthan',
    nights: '25 days · Across India',
    title: 'Grand India Odyssey'
  }
];

document.querySelectorAll('.package').forEach((card, index) => {
  const detail = packageDetails[index];
  if (!detail) return;
  const image = card.querySelector('img');
  const nights = card.querySelector('div > p');
  const title = card.querySelector('h3');
  if (image) { image.src = detail.image; image.alt = detail.alt; }
  if (nights) nights.textContent = detail.nights;
  if (title) title.textContent = detail.title;
});

// India is much bigger than any one destination. This directory covers every
// state and union territory, with each choice leading into a bespoke enquiry.
const indiaRegions = [
  { name: 'North & Himalayas', places: [['Haryana', 'State'], ['Himachal Pradesh', 'State'], ['Punjab', 'State'], ['Uttar Pradesh', 'State'], ['Uttarakhand', 'State'], ['Chandigarh', 'Union territory'], ['Delhi', 'Union territory'], ['Jammu & Kashmir', 'Union territory'], ['Ladakh', 'Union territory']] },
  { name: 'West & Desert', places: [['Goa', 'State'], ['Gujarat', 'State'], ['Maharashtra', 'State'], ['Rajasthan', 'State'], ['Dadra & Nagar Haveli and Daman & Diu', 'Union territory']] },
  { name: 'Central India', places: [['Chhattisgarh', 'State'], ['Madhya Pradesh', 'State']] },
  { name: 'South India & Islands', places: [['Andhra Pradesh', 'State'], ['Karnataka', 'State'], ['Kerala', 'State'], ['Tamil Nadu', 'State'], ['Telangana', 'State'], ['Lakshadweep', 'Union territory'], ['Puducherry', 'Union territory'], ['Andaman & Nicobar Islands', 'Union territory']] },
  { name: 'East India', places: [['Bihar', 'State'], ['Jharkhand', 'State'], ['Odisha', 'State'], ['West Bengal', 'State']] },
  { name: 'Northeast India', places: [['Arunachal Pradesh', 'State'], ['Assam', 'State'], ['Manipur', 'State'], ['Meghalaya', 'State'], ['Mizoram', 'State'], ['Nagaland', 'State'], ['Sikkim', 'State'], ['Tripura', 'State']] }
];

const directoryGrid = document.querySelector('#india-directory-grid');
if (directoryGrid) {
  const directoryStyle = document.createElement('style');
  directoryStyle.textContent = `.india-directory{background:#f5f9fd}.directory-intro{max-width:620px;margin:-18px 0 38px;color:#496179;font-size:16px;line-height:1.7}.india-directory-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.state-region{background:#fff;border:1px solid #dce8f3;padding:24px;box-shadow:0 8px 22px rgba(11,58,104,.05)}.state-region h3{font:700 23px var(--serif);margin:0 0 4px}.state-region>p{margin:0 0 16px;color:#668096;font-size:11px;text-transform:uppercase;letter-spacing:.13em;font-weight:700}.state-list{display:flex;flex-wrap:wrap;gap:8px}.state-pill{appearance:none;border:1px solid #cadceb;background:#fff;color:var(--ink);padding:8px 10px;text-align:left;border-radius:2px;font-size:12px;line-height:1.25;transition:background .2s,border-color .2s,color .2s,transform .2s}.state-pill:hover,.state-pill:focus-visible{border-color:var(--blue);background:var(--blue);color:#fff;transform:translateY(-1px);outline:none}.state-pill .state-type{display:block;margin-top:3px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;opacity:.7}@media(max-width:980px){.india-directory-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.india-directory-grid{grid-template-columns:1fr}.state-region{padding:20px}.directory-intro{font-size:15px}}`;
  document.head.append(directoryStyle);

  indiaRegions.forEach(region => {
    const group = document.createElement('article');
    group.className = 'state-region';
    const title = document.createElement('h3'); title.textContent = region.name;
    const label = document.createElement('p'); label.textContent = `${region.places.length} places to explore`;
    const list = document.createElement('div'); list.className = 'state-list';
    region.places.forEach(([place, type]) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'state-pill';
      button.innerHTML = `${place}<span class="state-type">${type}</span>`;
      button.addEventListener('click', () => { bookingTrip.value = `${place} — bespoke India journey`; modal.showModal(); });
      list.append(button);
    });
    group.append(title, label, list); directoryGrid.append(group);
  });
}

// Multi-product travel search: a distinct, utility-led interface for flights,
// stays, tours and cabs that leads into the results experience.
const finderShell = document.querySelector('.finder-shell');
if (finderShell) {
  const finderStyle = document.createElement('style');
  finderStyle.textContent = `.booking-tabs{display:flex;gap:22px;border-bottom:1px solid #e4ddd2;overflow:auto}.booking-tab{border:0;border-bottom:3px solid transparent;background:transparent;padding:17px 0 13px;color:#63746e;font-size:12px;font-weight:700;white-space:nowrap}.booking-tab.is-active{color:#173f37;border-color:#b66f3f}.booking-search{display:grid;grid-template-columns:repeat(4,minmax(0,1fr)) auto;gap:0;padding-top:22px}.booking-search label{border-left:1px solid #e4ddd2;padding:0 17px;color:#71827c;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}.booking-search input,.booking-search select{display:block;width:100%;margin-top:6px;border:0;background:transparent;color:#173f37;font:600 15px var(--serif);outline:0}.booking-search .booking-submit{margin-left:12px;border:0;background:#b66f3f;color:#fff;padding:16px 19px;font-weight:700;white-space:nowrap}.booking-search .booking-submit span{margin-left:8px;font-size:18px}@media(max-width:780px){.booking-search{grid-template-columns:1fr 1fr}.booking-search label:nth-child(odd){border-left:0}.booking-search .booking-submit{margin:15px 0 0;width:max-content}}@media(max-width:480px){.booking-tabs{gap:15px}.booking-search{grid-template-columns:1fr}.booking-search label{border-left:0;border-top:1px solid #e4ddd2;padding:13px 0}.booking-search .booking-submit{width:100%}}`;
  document.head.append(finderStyle);
  finderShell.innerHTML = `<div class="booking-tabs" role="tablist" aria-label="Travel search"><button class="booking-tab is-active" type="button" data-search="Tours">Tour packages</button><button class="booking-tab" type="button" data-search="Flights">Flights</button><button class="booking-tab" type="button" data-search="Hotels">Hotels</button><button class="booking-tab" type="button" data-search="Cabs">Cabs</button></div><form class="booking-search" id="booking-search-form"></form>`;
  const searchForm = finderShell.querySelector('#booking-search-form');
  let searchMode = 'Tours';
  const field = (label, name, value, type = 'text') => `<label>${label}<input name="${name}" type="${type}" value="${value}" required></label>`;
  function renderSearchFields() {
    const places = searchMode === 'Tours' ? ['Destination', 'India'] : searchMode === 'Hotels' ? ['City or hotel', 'Mumbai'] : ['From', 'Delhi'];
    const second = searchMode === 'Flights' || searchMode === 'Cabs' ? field('To', 'to', 'Mumbai') : field(searchMode === 'Tours' ? 'Travel style' : 'Guests', searchMode === 'Tours' ? 'to' : 'to', searchMode === 'Tours' ? 'Culture & comfort' : '2 guests');
    const returnField = searchMode === 'Cabs' ? field('Pickup time', 'return', '10:00') : field(searchMode === 'Hotels' ? 'Check-out' : 'Return date', 'return', '2026-10-20', 'date');
    searchForm.innerHTML = `${field(places[0], 'from', places[1])}${second}${field(searchMode === 'Hotels' ? 'Check-in' : 'Departure date', 'date', '2026-10-12', 'date')}${returnField}<button class="booking-submit" type="submit">Search ${searchMode} <span>→</span></button>`;
  }
  finderShell.querySelectorAll('.booking-tab').forEach(tab => tab.addEventListener('click', () => { searchMode = tab.dataset.search; finderShell.querySelectorAll('.booking-tab').forEach(item => item.classList.toggle('is-active', item === tab)); renderSearchFields(); }));
  searchForm.addEventListener('submit', event => { event.preventDefault(); const data = new FormData(searchForm); const params = new URLSearchParams({ type: searchMode, from: data.get('from'), to: data.get('to'), date: data.get('date') }); window.location.href = `results.html?${params}`; });
  renderSearchFields();
}

// Complete the enquiry form with contact and country details.
const enquiry = document.querySelector('#contact-form');
if (enquiry) {
  const submit = enquiry.querySelector('[type="submit"]');
  const extra = document.createElement('div');
  extra.innerHTML = `<div class="form-row"><label>Phone number<input required type="tel" name="phone" autocomplete="tel" placeholder="Your number"></label><label>Country<select name="country"><option value="US">United States</option><option value="IN">India</option><option value="GB">United Kingdom</option><option value="EU">Europe (Euro)</option><option value="AE">United Arab Emirates</option><option value="AU">Australia</option><option value="CA">Canada</option><option value="SG">Singapore</option></select></label></div><label>Your travel ideas<textarea required name="message" rows="4" placeholder="Places, dates, travellers or anything you have in mind..."></textarea></label><p class="currency-note">We will reply with your itinerary and pricing in your preferred currency.</p>`;
  enquiry.insertBefore(extra, submit);
}
