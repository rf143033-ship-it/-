'use strict';

(function initCityDetails() {
  if (!document.getElementById('cityDetailsPage')) return;

  const cityId = new URLSearchParams(window.location.search).get('id') || 'jubail';
  const city = typeof CITIES_DATA !== 'undefined' ? CITIES_DATA.find(c => c.id === cityId) : null;

  if (!city) {
    document.getElementById('cityDetailsPage').innerHTML = '<div class="container section"><p class="text-center">المدينة غير موجودة</p></div>';
    return;
  }

  document.title = `${city.name} - منصة المدن الصناعية`;

  const hero = document.getElementById('cityHero');
  const heroBg = document.getElementById('cityHeroBg');
  if (hero) {
    if (heroBg) {
      heroBg.style.backgroundImage = `url(${city.heroImage})`;
      heroBg.style.backgroundSize = 'cover';
      heroBg.style.backgroundPosition = 'center';
    } else {
      hero.style.backgroundImage = `url(${city.heroImage})`;
    }
    const nameEl = document.getElementById('cityHeroName');
    const nameTitleEl = document.getElementById('cityHeroNameTitle');
    if (nameEl) nameEl.textContent = city.name;
    if (nameTitleEl) nameTitleEl.textContent = city.name;
    document.getElementById('cityHeroRegion').textContent = city.region;
    document.getElementById('cityHeroEstablished').textContent = city.established;
    document.getElementById('cityHeroFactories').textContent = city.factories.toLocaleString('ar-SA');
    document.getElementById('cityHeroWorkers').textContent = city.workers.toLocaleString('ar-SA');
  }

  const desc = document.getElementById('cityDescription');
  if (desc) desc.textContent = city.description;

  const industriesContainer = document.getElementById('cityIndustries');
  if (industriesContainer) {
    industriesContainer.innerHTML = city.industries.map(ind => `
      <div class="tag tag-gold">${ind}</div>
    `).join('');
  }

  const servicesContainer = document.getElementById('cityServices');
  if (servicesContainer) {
    servicesContainer.innerHTML = city.services.map(svc => `
      <div class="feature-item">
        <div class="feature-icon"><i class="fas fa-check-circle"></i></div>
        <div class="feature-text"><p>${svc}</p></div>
      </div>
    `).join('');
  }

  const visionEl = document.getElementById('cityVision');
  if (visionEl) visionEl.textContent = city.vision2030Role;

  const investContainer = document.getElementById('cityInvestment');
  if (investContainer) {
    investContainer.innerHTML = city.investmentHighlights.map(h => `
      <div class="feature-item">
        <div class="feature-icon"><i class="fas fa-star"></i></div>
        <div class="feature-text"><p>${h}</p></div>
      </div>
    `).join('');
  }

  const statsEl = document.getElementById('cityStats');
  if (statsEl && city.stats) {
    statsEl.innerHTML = `
      <div class="stat-card">
        <div class="icon"><i class="fas fa-chart-bar"></i></div>
        <div class="number">${city.stats.annualProduction}</div>
        <div class="label">الإنتاج السنوي</div>
      </div>
      <div class="stat-card">
        <div class="icon"><i class="fas fa-ship"></i></div>
        <div class="number">${city.stats.exportPercentage}</div>
        <div class="label">نسبة التصدير</div>
      </div>
      <div class="stat-card">
        <div class="icon"><i class="fas fa-flag"></i></div>
        <div class="number">${city.stats.localContent}</div>
        <div class="label">المحتوى المحلي</div>
      </div>
      <div class="stat-card">
        <div class="icon"><i class="fas fa-users"></i></div>
        <div class="number">${city.saudiEmployment}%</div>
        <div class="label">توطين الوظائف</div>
      </div>
    `;
  }

  const relatedContainer = document.getElementById('relatedCities');
  if (relatedContainer && typeof CITIES_DATA !== 'undefined') {
    const related = CITIES_DATA.filter(c => c.id !== cityId).slice(0, 3);
    relatedContainer.innerHTML = related.map(c => `
      <a href="city-details.html?id=${c.id}" class="card hover-lift">
        <div class="card-image">
          <img src="${c.image}" alt="${c.name}" loading="lazy">
          <span class="card-badge">${c.region}</span>
        </div>
        <div class="card-body">
          <h4 class="card-title">${c.name}</h4>
          <p class="card-text">${c.description.substring(0, 100)}...</p>
        </div>
        <div class="card-footer">
          <span class="card-meta"><i class="fas fa-industry"></i> ${c.factories} منشأة</span>
          <span class="card-meta"><i class="fas fa-users"></i> ${c.workers.toLocaleString('ar-SA')}</span>
        </div>
      </a>
    `).join('');
  }
})();