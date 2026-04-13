'use strict';

(function initIndustryDetails() {
  if (!document.getElementById('industryDetailsPage')) return;

  const industryId = new URLSearchParams(window.location.search).get('id') || 'petrochemicals';
  const industry = typeof INDUSTRIES_DATA !== 'undefined' ? INDUSTRIES_DATA.find(i => i.id === industryId) : null;

  if (!industry) return;

  document.title = `${industry.name} - منصة المدن الصناعية`;

  const nameEl = document.getElementById('industryName');
  if (nameEl) nameEl.textContent = industry.name;

  const descEl = document.getElementById('industryDesc');
  if (descEl) descEl.textContent = industry.description;

  const imgEl = document.getElementById('industryImage');
  if (imgEl) imgEl.src = industry.image;

  const gdpEl = document.getElementById('industryGdp');
  if (gdpEl) gdpEl.textContent = industry.gdpShare + '%';

  const exportsEl = document.getElementById('industryExports');
  if (exportsEl) exportsEl.textContent = industry.exports;

  const companiesEl = document.getElementById('industryCompanies');
  if (companiesEl) companiesEl.textContent = industry.companies;

  
  const citiesContainer = document.getElementById('industryCities');
  if (citiesContainer && typeof CITIES_DATA !== 'undefined') {
    const relatedCities = CITIES_DATA.filter(c => industry.cities.includes(c.id));
    citiesContainer.innerHTML = relatedCities.map(c => `
      <a href="city-details.html?id=${c.id}" class="card hover-lift">
        <div class="card-image">
          <img src="${c.image}" alt="${c.name}" loading="lazy">
        </div>
        <div class="card-body">
          <h4 class="card-title">${c.name}</h4>
          <p class="card-text" style="font-size:0.85rem">${c.region}</p>
        </div>
      </a>
    `).join('');
  }
})();
