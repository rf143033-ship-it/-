'use strict';

(function initInvestmentPage() {
  if (!document.getElementById('investmentPage')) return;

  const container = document.getElementById('opportunitiesGrid');
  if (!container || typeof INVESTMENT_OPPORTUNITIES === 'undefined') return;

  container.innerHTML = INVESTMENT_OPPORTUNITIES.map(opp => `
    <div class="card hover-lift reveal">
      <div class="card-image">
        <img src="${opp.image}" alt="${opp.title}" loading="lazy">
        <span class="card-badge">${opp.sector}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${opp.title}</h3>
        <p class="card-text">${opp.description}</p>
        <div class="grid-3 mt-16" style="gap:12px">
          <div style="background:#f8f9fa;padding:12px;border-radius:8px;text-align:center">
            <div style="font-size:0.75rem;color:#999;margin-bottom:4px">الحد الأدنى</div>
            <div style="font-weight:800;color:#2C3E50;font-size:0.9rem">${opp.minInvestment}</div>
          </div>
          <div style="background:#f8f9fa;padding:12px;border-radius:8px;text-align:center">
            <div style="font-size:0.75rem;color:#999;margin-bottom:4px">العائد المتوقع</div>
            <div style="font-weight:800;color:#D4AF37;font-size:0.9rem">${opp.expectedReturn}</div>
          </div>
          <div style="background:#f8f9fa;padding:12px;border-radius:8px;text-align:center">
            <div style="font-size:0.75rem;color:#999;margin-bottom:4px">المدة</div>
            <div style="font-weight:800;color:#2C3E50;font-size:0.9rem">${opp.timeframe}</div>
          </div>
        </div>
        <div class="mt-16">
          <div style="font-weight:700;color:#2C3E50;margin-bottom:8px;font-size:0.9rem">الحوافز والمزايا:</div>
          <div class="tags">
            ${opp.incentives.map(inc => `<span class="tag tag-gold">${inc}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <a href="city-details.html?id=${opp.city}" class="btn btn-gold-outline btn-sm">عرض المدينة</a>
        <a href="contact.html" class="btn btn-primary btn-sm">تواصل معنا</a>
      </div>
    </div>
  `).join('');
})();
