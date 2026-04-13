'use strict';

(function initExploreCities() {
  if (!document.getElementById('exploreCitiesPage')) return;
  if (typeof CITIES_DATA === 'undefined') return;

  const container = document.getElementById('citiesGrid');
  const searchInput = document.getElementById('citySearchInput');
  const regionFilter = document.getElementById('regionFilter');
  const industryFilter = document.getElementById('industryFilter');
  const sortSelect = document.getElementById('sortSelect');

  let currentData = [...CITIES_DATA];

  function renderCities(data) {
    if (!container) return;
    if (data.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px">
          <i class="fas fa-search" style="font-size:3rem;color:#ddd;margin-bottom:16px;display:block"></i>
          <h3 style="color:#999">لا توجد مدن مطابقة للبحث</h3>
          <p style="color:#bbb;margin-top:8px">حاول تغيير معايير البحث</p>
        </div>
      `;
      return;
    }

    container.innerHTML = data.map(city => `
      <a href="city-details.html?id=${city.id}" class="card hover-lift reveal">
        <div class="card-image">
          <img src="${city.image}" alt="${city.name}" loading="lazy">
          <span class="card-badge">${city.region}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${city.name}</h3>
          <p class="card-text">${city.description.substring(0, 120)}...</p>
          <div class="tags mt-16">
            ${city.industries.slice(0, 3).map(i => `<span class="tag">${i}</span>`).join('')}
          </div>
        </div>
        <div class="card-footer">
          <span class="card-meta"><i class="fas fa-industry"></i> ${city.factories.toLocaleString('ar-SA')} منشأة</span>
          <span class="card-meta"><i class="fas fa-users"></i> ${city.workers.toLocaleString('ar-SA')}</span>
        </div>
      </a>
    `).join('');
  }

  function applyFilters() {
    let data = [...CITIES_DATA];
    const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const regionVal = regionFilter ? regionFilter.value : '';
    const industryVal = industryFilter ? industryFilter.value : '';
    const sortVal = sortSelect ? sortSelect.value : '';

    if (searchVal) {
      data = data.filter(c =>
        c.name.includes(searchVal) ||
        c.region.includes(searchVal) ||
        c.industries.some(i => i.includes(searchVal))
      );
    }

    if (regionVal) {
      data = data.filter(c => c.region.includes(regionVal));
    }

    if (industryVal) {
      data = data.filter(c => c.industries.some(i => i.includes(industryVal)));
    }

    if (sortVal === 'factories') {
      data.sort((a, b) => b.factories - a.factories);
    } else if (sortVal === 'workers') {
      data.sort((a, b) => b.workers - a.workers);
    } else if (sortVal === 'established') {
      data.sort((a, b) => a.established - b.established);
    }

    const countEl = document.getElementById('citiesCount');
    if (countEl) countEl.textContent = data.length;

    renderCities(data);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (regionFilter) regionFilter.addEventListener('change', applyFilters);
  if (industryFilter) industryFilter.addEventListener('change', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);

  const urlSearch = new URLSearchParams(window.location.search).get('search');
  if (urlSearch && searchInput) {
    searchInput.value = urlSearch;
  }

  applyFilters();
})();
