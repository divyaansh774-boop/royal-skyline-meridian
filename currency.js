(() => {
  const currencies = {
    US: { code: 'USD', locale: 'en-US', rate: 1, label: 'United States (USD)' },
    IN: { code: 'INR', locale: 'en-IN', rate: 83.12, label: 'India (INR)' },
    GB: { code: 'GBP', locale: 'en-GB', rate: 0.79, label: 'United Kingdom (GBP)' },
    EU: { code: 'EUR', locale: 'de-DE', rate: 0.92, label: 'Europe (EUR)' },
    AE: { code: 'AED', locale: 'en-AE', rate: 3.67, label: 'United Arab Emirates (AED)' },
    AU: { code: 'AUD', locale: 'en-AU', rate: 1.52, label: 'Australia (AUD)' },
    CA: { code: 'CAD', locale: 'en-CA', rate: 1.37, label: 'Canada (CAD)' },
    SG: { code: 'SGD', locale: 'en-SG', rate: 1.34, label: 'Singapore (SGD)' }
  };
  const saved = localStorage.getItem('rsm-currency') || 'US';
  const format = (usd, country) => {
    const item = currencies[country];
    return new Intl.NumberFormat(item.locale, { style: 'currency', currency: item.code, maximumFractionDigits: 0 }).format(usd * item.rate);
  };
  window.RSMCurrency = { currencies, format, selected: saved };
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-currency-select]').forEach(select => {
      Object.entries(currencies).forEach(([key, item]) => {
        const option = new Option(item.label, key); option.selected = key === saved; select.add(option);
      });
      select.addEventListener('change', () => {
        localStorage.setItem('rsm-currency', select.value);
        window.RSMCurrency.selected = select.value;
        document.querySelectorAll('[data-currency-select]').forEach(other => { other.value = select.value; });
        document.dispatchEvent(new CustomEvent('rsm:currency', { detail: select.value }));
      });
    });
  });
})();
