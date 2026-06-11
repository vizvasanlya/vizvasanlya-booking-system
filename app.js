const cards = [{"label": "Bookings", "value": "156", "delta": "+21"}, {"label": "No-shows", "value": "3.2%", "delta": "-1.1%"}, {"label": "Capacity", "value": "82%", "delta": "+9%"}, {"label": "Reviews", "value": "4.7/5", "delta": "+0.3"}];
const rows = [{"title": "Consultation call", "status": "Confirmed", "detail": "Reminder sent with calendar attachment."}, {"title": "Product demo", "status": "Pending", "detail": "Waiting for customer time-zone confirmation."}, {"title": "Support session", "status": "Completed", "detail": "Follow-up notes attached to account."}, {"title": "Workshop seat", "status": "Waitlist", "detail": "Two seats expected to open this week."}];
const insights = ["Reminder messages reduced no-shows.", "Peak demand is concentrated on Wednesday afternoons.", "Waitlist conversion improved with same-day openings."];
const storageKey = 'vizvasanlya-booking-system-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
