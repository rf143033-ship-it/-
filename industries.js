'use strict';

(function initIndustriesPage() {
  if (!document.getElementById('industriesPage')) return;

  const container = document.getElementById('industriesGrid');
  if (!container || typeof INDUSTRIES_DATA === 'undefined') return;

  function renderIndustries(data) {
    container.innerHTML = data.map(ind => `
      <a href="industry-details.html?id=${ind.id}" class="card hover-lift reveal">
        <div class="card-image">
          <img src="${ind.image}" alt="${ind.name}" loading="lazy">
          <span class="card-badge" style="background:${ind.color}">${ind.name}</span>
        </div>
        <div class="card-body">
          <div class="d-flex align-center gap-16 mb-16">
            <div style="width:48px;height:48px;background:rgba(212,175,55,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center;">
              <i class="fas ${ind.icon}" style="color:#D4AF37;font-size:1.3rem;"></i>
            </div>
            <h3 class="card-title" style="margin:0">${ind.name}</h3>
          </div>
          <p class="card-text">${ind.description}</p>
          <div class="d-flex gap-16 mt-16">
            <div style="text-align:center;flex:1;padding:12px;background:#f8f9fa;border-radius:8px;">
              <div style="font-size:1.2rem;font-weight:800;color:#D4AF37">${ind.gdpShare}%</div>
              <div style="font-size:0.78rem;color:#999">من الناتج الصناعي</div>
            </div>
            <div style="text-align:center;flex:1;padding:12px;background:#f8f9fa;border-radius:8px;">
              <div style="font-size:1.2rem;font-weight:800;color:#2C3E50">${ind.companies}</div>
              <div style="font-size:0.78rem;color:#999">شركة</div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <span class="card-meta"><i class="fas fa-box"></i> صادرات: ${ind.exports}</span>
          <span style="color:#D4AF37;font-weight:700;font-size:0.85rem;">استكشف <i class="fas fa-arrow-left"></i></span>
        </div>
      </a>
    `).join('');
  }

  renderIndustries(INDUSTRIES_DATA);

  
  const filterBtns = document.querySelectorAll('.industry-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      if (filter === 'all') {
        renderIndustries(INDUSTRIES_DATA);
      } else {
        renderIndustries(INDUSTRIES_DATA.filter(i => i.id === filter));
      }
    });
  });
})();
